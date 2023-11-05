import { getEnergyConsumed } from "../utils/get-energy-consumed.js";
import { readImageFile } from "../utils/read-image-file.js";
import { TimeManager } from "../models/time-manager.js";
import { getPowerDrawnByGPU } from "../utils/get-power-drawn-by-gpu.js";
import {
  writeBlue,
  writeGreen,
  writeMagenta,
  writeRed,
  writeTextWithColors,
  writeYellow,
} from "../utils/text-helper.js";

export async function getPowerConsumptionByGraphicsCard() {
  // calculates gpu usage by getting the average gpu power over a time period
  // it is not the best way to measure it because cpu can take some time to process some things else but either ways
  // it is calculated by using the average power
  const FULL_SIZE_IMG_PATH = "./resources/sunset.jpeg";
  const GPU_UTILIZATION_CHECK_RATE = 5000; // helps to determine the quantity of time the gpu usage is checked,
  // ideally, it would be a small number, however, that would make the program really sluggish and non responsive
  let gpuAveragePower = 0;
  let gpuCheckingTimes = 0;
  const idleCalculationTimes = 5;
  let idleGpuAveragePower = 0;

  // to calculate idle gpu average power, it could also calculate the gpu power for the rest of processes
  for (let index = 0; index < idleCalculationTimes; index++) {
    writeBlue("Processing idle gpu power...");
    idleGpuAveragePower += await getPowerDrawnByGPU();
  }
  idleGpuAveragePower /= idleCalculationTimes;

  let fullSizeImageBuffer;
  try {
    fullSizeImageBuffer = await readImageFile(FULL_SIZE_IMG_PATH);
  } catch (error) {
    fullSizeImageBuffer = null;
  }

  if (fullSizeImageBuffer) {
    const bufferSize = fullSizeImageBuffer.length;
    gpuCheckingTimes = Math.floor(bufferSize / GPU_UTILIZATION_CHECK_RATE);
    const timeManager = new TimeManager("Processing full size image");
    for (let index = 0; index < bufferSize; index++) {
      if (index % GPU_UTILIZATION_CHECK_RATE === 0) {
        writeMagenta("Processing current gpu power...", "red");
        const powerDrawnByGPU = await getPowerDrawnByGPU();
        gpuAveragePower += powerDrawnByGPU;
      }
    }
    gpuAveragePower /= gpuCheckingTimes;
    const elapsedTime = timeManager.getCurrentTime();
    // We can now calculate energy consumed by multiplying time and average gpu power
    // it won't be the most precise but will give us a good estimate

    const taskGPUAveragePower =
      gpuAveragePower - idleGpuAveragePower >= 0
        ? gpuAveragePower - idleGpuAveragePower
        : 0;
    process.stdout.write("Idle GPU power: ");
    writeBlue(`${idleGpuAveragePower}w`);
    process.stdout.write("Process + background tasks power: ");
    writeMagenta(`${gpuAveragePower}w`);
    process.stdout.write("Average task power: ");
    writeYellow(`${taskGPUAveragePower}w`);
    process.stdout.write("Elapsed Time: ");
    writeGreen(`${elapsedTime}ms`);
    const energy = getEnergyConsumed(elapsedTime, taskGPUAveragePower);
    process.stdout.write("Graphical Processing Unit consumed ");
    writeRed(`${energy}KwH`);
  }
}
