export const CHECKSUM_LEN = 4;

export interface ChitHeader {
  payloadLength: number;
  checksum: string;
}

export interface ChitGabberish {
  header: ChitHeader;
  payload: string;
}
