import { Buffer } from "buffer";
import { Socket } from "net";
import { hashFnv32a } from "../hasher/hash";
import { CHECKSUM_LEN, ChitGabberish, ChitHeader } from "./chitGabberish";

enum HandlerMode {
  HEADER,
  PAYLOAD,
}

export class ChitChatAgent {
  _socket: Socket;

  _buffer: Buffer;
  _cursor: number;
  _payloadLength: number;

  _mode: HandlerMode;
  _cb: Function | undefined;

  constructor(socket: Socket, onData?: Function) {
    this._socket = socket;

    this._buffer = Buffer.alloc(0);
    this._cursor = 0;
    this._payloadLength = 0;

    this._mode = HandlerMode.HEADER;
    this._cb = onData;

    this._socket.on("data", (data) => {
      this._buffer = Buffer.concat([this._buffer, data]);

      this._work();
    });
  }

  _hasBytes(num: number) {
    return this._buffer.length >= num;
  }

  _sliceBuffer(start: number) {
    this._buffer = this._buffer.subarray(start);
    this._cursor = 0;
  }

  _readUint16LE() {
    const res = this._buffer.readUInt16LE(this._cursor);
    this._cursor += 1;
    return res;
  }

  _readString(len: number) {
    const res = this._buffer.toString(
      "utf-8",
      this._cursor,
      this._cursor + len
    );
    this._cursor += len;
    return res;
  }

  _readHeader() {
    const payloadLength = this._readUint16LE();
    const checksum = this._readString(CHECKSUM_LEN);
    this._sliceBuffer(2 + CHECKSUM_LEN);

    return { payloadLength, checksum } as ChitHeader;
  }

  _readPayload(len: number) {
    const msg = this._readString(len);
    this._sliceBuffer(len);

    return msg;
  }

  _isHeaderValid(header: ChitHeader) {
    const hash = hashFnv32a(header.payloadLength.toString());
    return header.checksum === hash;
  }

  _work() {
    while (this._buffer.length) {
      switch (this._mode) {
        case HandlerMode.HEADER:
          const header = this._readHeader();
          if (!this._isHeaderValid(header)) {
            console.error("Invalid Header. Ignoring.");
          } else {
            console.log("Incoming Payload:", header.payloadLength);
            this._payloadLength = header.payloadLength;
            this._mode = HandlerMode.PAYLOAD;
          }
          break;

        case HandlerMode.PAYLOAD:
          const payload = this._readPayload(this._payloadLength);
          this._payloadLength = 0;
          if (this._cb) {
            this._cb(payload);
          }
          break;
      }
    }
  }

  send(msg: string) {
    const payload = Buffer.from(msg);
    const payloadLength = payload.length;
    const checksum = hashFnv32a(payloadLength.toString());

    const headerBuffer = Buffer.allocUnsafe(2 + CHECKSUM_LEN);
    headerBuffer.writeUInt16LE(payloadLength); // header.payloadLength
    headerBuffer.write(checksum, 2);

    this._socket.write(headerBuffer);
    this._socket.write(payload);
  }

  close() {
    this._socket.end("Connection Closed.");
  }
}
