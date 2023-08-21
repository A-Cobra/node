import { getPowerConsumptionByTimeDrivenApproach } from "./calculation-methods/get-power-consumption-by-time-driven-approach.js";
import { getPowerConsumptionByCompressionApproach } from "./calculation-methods/get-power-consumption-by-compression-approach.js";

function main() {
  getPowerConsumptionByTimeDrivenApproach();
  console.log("\n\n");
  getPowerConsumptionByCompressionApproach();
}

main();
