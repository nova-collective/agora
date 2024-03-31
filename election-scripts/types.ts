export enum result {
  OK = "ok",
  ERROR = "error",
}

export interface Response<T> {
  result: result;
  errorMessage?: string;
  data?: T;
}

export type EOAResponse = {
  address: string;
  privateKey: string;
};
