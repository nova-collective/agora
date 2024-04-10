import { Party } from "./types";

export const DECS_REGISTRY_NAME = "Italy DECs Registry";

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
