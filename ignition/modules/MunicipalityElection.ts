import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { Party } from "../types";

const partyNameA = "Partito Democratico";
const partyNameB = "Forza Italia";
const partyNameC = "Cinque Stelle";
const partyNameD = "Lega";

const parties: Party[] = [
  {
    name: partyNameA,
    counciliorCandidates: [
      "Luigi Rossi",
      "Maria Verdi",
      "Renato Bianchi",
      "Francesco Giudi",
      "Paolo Franchi",
    ],
  },
  {
    name: partyNameB,
    counciliorCandidates: [
      "Francesca Riti",
      "Mario Cecchi",
      "Carlo Proni",
      "Piepaolo Pingitore",
      "Vanessa Reti",
    ],
  },
  {
    name: partyNameC,
    counciliorCandidates: [
      "Giuseppe Toni",
      "Nicolò Movizzo",
      "Alessandra Tonali",
      "Antonella Chierici",
      "Antonio Basso",
    ],
  },
  {
    name: partyNameD,
    counciliorCandidates: [
      "Patrizio Pini",
      "Mariagrazia Crudi",
      "Sabrina Giacigli",
      "Marco Lioni",
      "Pio Pedri",
    ],
  },
];

export default buildModule("MunicipalityElection", (m) => {
  const municipalityElection = m.contract("MunicipalityElection", [
    m.getParameter("name"),
    m.getParameter("municipality"),
    m.getParameter("region"),
    m.getParameter("country"),
    m.getParameter("registrationStart"),
    m.getParameter("registrationEnd"),
    m.getParameter("votingPoints"),
  ]);

  parties.forEach((p, index) => {
    m.call(
      municipalityElection,
      "registerParty",
      [p.name, p.counciliorCandidates],
      { id: `registerElection_${index}` },
    );
  });

  m.call(
    municipalityElection,
    "registerCoalition",
    ["Candidate 1", [partyNameA, partyNameB]],
    {
      id: "registerCoalition_0",
    },
  );

  m.call(
    municipalityElection,
    "registerCoalition",
    ["Candidate 2", [partyNameC, partyNameD]],
    {
      id: "registerCoalition_1",
    },
  );

  return { municipalityElection };
});
