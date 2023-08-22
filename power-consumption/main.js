import { getPowerConsumptionByTimeDrivenApproach } from "./calculation-methods/get-power-consumption-by-time-driven-approach.js";
import { getPowerConsumptionByCompressionApproach } from "./calculation-methods/get-power-consumption-by-compression-approach.js";
// import si from "systeminformation";
import { getPowerConsumptionByGraphicsCard } from "./calculation-methods/get-power-consumption-by-graphics-card.js";

async function main() {
  // WORKS
  getPowerConsumptionByTimeDrivenApproach();
  console.log("\n\n");
  await getPowerConsumptionByCompressionApproach();
  console.log("\n\n");
  getPowerConsumptionByGraphicsCard();
}

main();
