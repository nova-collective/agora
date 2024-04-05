import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MunicipalityElection", (m) => {
  const municipalityElection = m.contract("MunicipalityElection", [
    // m.getParameter("name"),
    // m.getParameter("registrationStart"),
    // m.getParameter("registrationEnd"),
    // m.getParameter("municipality"),
    // m.getParameter("region"),
    // m.getParameter("country"),
    // m.getParameter("votingPoints"),
    "Election of major of Braccagni city",
    "Braccagni",
    "Toscana",
    "Italy",
    1714578352000,
    1717256752000,
    20,
  ]);

  // console.log("----------------------");
  // console.log(JSON.stringify(m.getParameter("partyA")));
  // console.log("----------------------");

  //const parties = [
  //  m.getParameter("partyA"),
  //  m.getParameter("partyB"),
  //  m.getParameter("partyC"),
  //  m.getParameter("partyD"),
  //];

  //m.call(municipalityElection, "registerParty", [
  //  parties[0].name,
  //  parties[0].counciliorCandidates,
  //]);

  //parties.forEach((p) => {
  //  m.call(municipalityElection, "registerParty", [
  //    p.name,
  //    p.counciliorCandidates,
  //  ]);
  //});

  return { municipalityElection };
});
