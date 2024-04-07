import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DEC", (m) => {
  const DEC1 = m.contract("TomsDEC", [
    "RSSMRA85C27H501W",
    "Ardea",
    "Lazio",
    "Italy",
  ]);

  m.call(DEC1, "getName", []);

  return { DEC1 };
});
