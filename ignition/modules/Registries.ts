import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DECsRegistry", (m) => {
  const italianRegistry = m.contract("DECsRegistry", ["Italy"]);

  m.call(italianRegistry, "getName", []);

  return { italianRegistry };
});
