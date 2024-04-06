import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

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

  return { municipalityElection };
});
