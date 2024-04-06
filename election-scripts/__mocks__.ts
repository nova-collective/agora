import { Candidature, Party } from "./types";

export const MUNICIPALITY_ELECTION_ADDRESS =
  "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export const PARTY_NAME_A = "Partito Democratico";
export const PARTY_NAME_B = "Forza Italia";
export const PARTY_NAME_C = "Cinque Stelle";
export const PARTY_NAME_D = "Lega";

export const PARTIES: Party[] = [
  {
    name: PARTY_NAME_A,
    councilorCandidates: [
      {
        name: "Luigi",
        surname: "Rossi",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Maria",
        surname: "Verdi",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Renato",
        surname: "Bianchi",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Francesco",
        surname: "Guidi",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Paolo",
        surname: "Franchi",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
    ],
  },
  {
    name: PARTY_NAME_B,
    councilorCandidates: [
      {
        name: "Francesca",
        surname: "Riti",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Vanessa",
        surname: "Reti",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Mario",
        surname: "Cecchi",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Carlo",
        surname: "Proni",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Pierpaolo",
        surname: "Pingitore",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
    ],
  },
  {
    name: PARTY_NAME_C,
    councilorCandidates: [
      {
        name: "Giuseppe",
        surname: "Toni",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Nicolò",
        surname: "Movizzo",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Alessandra",
        surname: "Tonali",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Antonella",
        surname: "Chierici",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Antonio",
        surname: "Basso",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
    ],
  },
  {
    name: PARTY_NAME_D,
    councilorCandidates: [
      {
        name: "Patrizio",
        surname: "Pini",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Mariagrazia",
        surname: "Crudi",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Sabrina",
        surname: "Giacigli",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Marco",
        surname: "Lioni",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
      {
        name: "Pio",
        surname: "Pedri",
        candidatesFor: Candidature.COUNCILOR,
        points: 0,
      },
    ],
  },
];
