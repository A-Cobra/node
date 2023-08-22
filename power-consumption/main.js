import { getPowerConsumptionByTimeDrivenApproach } from "./calculation-methods/get-power-consumption-by-time-driven-approach.js";
import { getPowerConsumptionByCompressionApproach } from "./calculation-methods/get-power-consumption-by-compression-approach.js";
import si from "systeminformation";
import { getPowerConsumptionByGraphicsCard } from "./calculation-methods/get-power-consumption-by-graphics-card.js";

function main() {
  // WORKS
  getPowerConsumptionByTimeDrivenApproach();
  console.log("\n\n");
  getPowerConsumptionByCompressionApproach();
  // WORKS

  getPowerConsumptionByGraphicsCard();
  // si.cpu()
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error(error));

  // likely
  // si.processes()
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error(error));

  // si.currentLoad()
  //   .then((data) => console.log(data.cpus))
  //   .catch((error) => console.error(error));

  // works;
  // si.graphics()
  //   .then((data) => console.log(data.controllers))
  //   .catch((error) => console.error(error));

  // setTimeout(() => {
  //   console.log("After timeout\n\n\n\n\n\n");
  //   si.graphics()
  //     .then((data) => console.log(data.controllers))
  //     .catch((error) => console.error(error));
  // }, 1500);
}

main();
