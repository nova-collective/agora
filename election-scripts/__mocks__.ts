import { Party } from "./types";

export const DECsRegistryData = {
  name: "Italy DECs Registry",
  address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  DECAddress: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
};

export const VoterEOA = {
  address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  privateKey:
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
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
