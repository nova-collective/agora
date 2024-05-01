import { Party } from "./types";

export const DECsRegistryData = {
  name: "Italy DECs Registry",
  address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  DECAddress: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
};

export const VoterEOA = {
  address: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
  privateKey:
    "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0",
};

export const DECMock = {
  taxCode: "RSSMRA85C27H501W",
  municipality: "Ardea",
  region: "Lazio",
  country: "Italy",
};

export const MUNICIPALITY_ELECTION_DATA = {
  name: "Election of mayor of Braccagni city",
  municipality: "Braccagni",
  region: "Toscana",
  country: "Italy",
  registrationStart: 1712269847,
  registrationEnd: 1717256752,
  votingPoints: 20,
};

export const PARTY_NAME_A = "partitoDemocratico";
export const PARTY_NAME_B = "cinqueStelle";
export const PARTY_NAME_C = "forzaItalia";
export const PARTY_NAME_D = "lega";

export const MAJOR_CANDIDATE_1 = "Pino Pini";
export const MAJOR_CANDIDATE_2 = "Ugo Silenti";

export const PARTIES: Party[] = [
  {
    name: PARTY_NAME_A,
    points: 0,
    councilorCandidates: [
      "Luigi Rossi",
      "Maria Verdi",
      "Renato Bianchi",
      "Francesco Guidi",
      "Paolo Franchi",
    ],
  },
  {
    name: PARTY_NAME_B,
    points: 0,
    councilorCandidates: [
      "Francesca Riti",
      "Vanessa Reti",
      "Mario Checchi",
      "Carlo Proni",
      "Pierpaolo Pingitore",
    ],
  },
  {
    name: PARTY_NAME_C,
    points: 0,
    councilorCandidates: [
      "Giuseppe Toni",
      "Nicolò Movizzo",
      "Alessandra Tonali",
      "Antonella Chierici",
      "Antonio Basso",
    ],
  },
  {
    name: PARTY_NAME_D,
    points: 0,
    councilorCandidates: [
      "Patrizio Pini",
      "Mariagrazia Crudi",
      "Sabrina Giacigli",
      "Marco Lioni",
      "Pio Pedri",
    ],
  },
];
