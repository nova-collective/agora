import { Party } from "./types";

export const DECsRegistryData = {
  name: "Italy DECs Registry",
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  DECAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  voterEOAAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
};

export const DECMock = {
  taxCode: "RSSMRA85C27H501W",
  municipality: "Ardea",
  region: "Lazio",
  country: "Italy",
};

export const PRIVATE_KEY =
  "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";

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
