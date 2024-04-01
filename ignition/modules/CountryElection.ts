import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CountryElection", (m) => {
  const countryElection = m.contract("CountryElection", [
    m.getParameter("registrationStart"),
    m.getParameter("registrationEnd"),
  ]);

  return { countryElection };
});
