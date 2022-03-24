// NOTE: 32-bit (4 bytes) checksum encoded in 8 bytes of string
export const CHECKSUM_LEN = 8;

export interface ChitHeader {
  payloadLength: number;
  checksum: string;
}

export interface ChitGabberish {
  header: ChitHeader;
  payload: string;
}
