import { Signer } from "ethers";

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

export type CreateDECResponse = {
  DECAddress: string;
};

export enum Candidature {
  MAJOR = "major",
  COUNCILOR = "councilor",
}

export type Candidate = {
  name: string;
  candidatesFor: Candidature;
  points: number;
};

export type Party = {
  name: string;
  points: number;
  councilorCandidates: string[];
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

export type Ballot = {
  contractAddress: string;
  coalitions: Coalition[];
};

export type ElectionData = {
  name: string;
  municipality: string;
  region: string;
  country: string;
  registrationStart: number;
  registrationEnd: number;
  votingPoints: number;
};

export type DEC = {
  taxCode: string;
  municipality: string;
  region: string;
  country: string;
};

export type RegistryResponse = {
  address: string;
  owner: Signer;
};
