import { Party } from "./types";

export const DECsRegistryData = {
  name: "Italy DECs Registry",
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  DECAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  voterEOAAddress: "0x99139259d6851c391cDDbFdab6337FC52Af0e74C",
};

export const VoterEOA = {
  address: "",
  privateKey:
    "0x38deabd7a3c86d7dc6d4a0309b92ef8ee523cef9b53326d4d3465b16d96b3ab1",
};

export const DECMock = {
  taxCode: "RSSMRA85C27H501W",
  municipality: "Ardea",
  region: "Lazio",
  country: "Italy",
};

export const MUNICIPALITY_ELECTION_DATA = {
  name: "Election of major of Braccagni city",
  municipality: "Braccagni",
  region: "Toscana",
  country: "Italy",
  registrationStart: 1712269847,
  registrationEnd: 1717256752,
  votingPoints: 20,
};

export const PARTY_NAME_A = "Partito Democratico";
export const PARTY_NAME_B = "Forza Italia";
export const PARTY_NAME_C = "Cinque Stelle";
export const PARTY_NAME_D = "Lega";

export const MAJOR_CANDIDATE_1 = "Pino Pini";
export const MAJOR_CANDIDATE_2 = "Ugo Silenti";

export const PARTIES: Party[] = [
  {
    name: PARTY_NAME_A,
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
    councilorCandidates: [
      "Patrizio Pini",
      "Mariagrazia Crudi",
      "Sabrina Giacigli",
      "Marco Lioni",
      "Pio Pedri",
    ],
  },
];
