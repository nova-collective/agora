export type Encrypted = {
  hash: string;
  chiper: string;
  nonce: string;
};

export type Decrypted = {
  message: string;
};

export type Hash = {
  hash: string;
};
