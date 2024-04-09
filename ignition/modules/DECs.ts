import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DEC", (m) => {
  const DEC1 = m.contract("TomsDEC", [
    m.getParameter("taxCode"),
    m.getParameter("municipality"),
    m.getParameter("region"),
    m.getParameter("country"),
  ]);

  m.call(DEC1, "getName", []);

  return { DEC1 };
});
