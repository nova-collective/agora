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

export enum Candidature {
  MAJOR = "major",
  COUNCILOR = "councilor",
}

export type Candidate = {
  name: string;
  surname: string;
  candidateFor: Candidature;
  points: number;
};

export type Party = {
  name: string;
  councilorCandidatesList: Candidate[];
};

export type Coalition = {
  majorCandidate: Candidate;
  parties: Party[];
};

export type MunicipalityElection = {
  country: string;
  region: string;
  municipality: string;
  votingPoints: number;
  coalitions: Coalition[];
  registrationStartDate: number;
  registrationEndDate: number;
  electionStartDate: number;
  electionEndDate: number;
  status: string;
};
