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

export type Candidate = {
  name: string;
  surname: string;
  points: number;
};

export type Party = {
  name: string;
  candidatesList: Candidate[];
  points: number;
};

export type Coalition = {
  coalitionCandidate: Candidate;
  points: number;
  parties: Party[];
};

export type CountryElection = {
  votingPoints: number;
  coalitions: Coalition[];
  registrationStartDate: number;
  registrationEndDate: number;
  electionStartDate: number;
  electionEndDate: number;
  status: string;
};
