import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MunicipalityElection", (m) => {
  const municipalityElection = m.contract("MunicipalityElection", [
    m.getParameter("registrationStart"),
    m.getParameter("registrationEnd"),
  ]);

  return { municipalityElection };
});
