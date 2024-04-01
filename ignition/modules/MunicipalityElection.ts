import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MunicipalityElection", (m) => {
  const municipalityElection = m.contract("MunicipalityElection", [
    m.getParameter("registrationStart"),
    m.getParameter("registrationEnd"),
    m.getParameter("municipality"),
    m.getParameter("region"),
    m.getParameter("country"),
    m.getParameter("votingPoints"),
  ]);

  return { municipalityElection };
});
