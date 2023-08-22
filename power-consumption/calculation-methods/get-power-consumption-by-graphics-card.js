import { getEnergyConsumed } from "../utils/get-energy-consumed.js";
import { readImageFile } from "../utils/read-image-file.js";
import { TimeManager } from "../models/time-manager.js";
import { getPowerDrawnByGPU } from "../utils/get-power-drawn-by-gpu.js";

export async function getPowerConsumptionByGraphicsCard() {
  // calculates gpu usage by getting the average gpu power over a time period
  const FULL_SIZE_IMG_PATH = "./resources/sunset.jpeg";
  const GPU_UTILIZATION_CHECK_RATE = 5000; // helps to determine the quantity of time the gpu usage is checked,
  // ideally, it would be a small number, however, that would make the program really sluggish and non responsive
  let gpuAveragePower = 0;
  let gpuCheckingTimes = 0;

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
        console.log("Processing...");
        const powerDrawnByGPU = await getPowerDrawnByGPU();
        gpuAveragePower += powerDrawnByGPU;
      }
    }
    gpuAveragePower /= gpuCheckingTimes;
    const elapsedTime = timeManager.getCurrentTime();
    // We can now calculate energy consumed by multiplying time and average gpu power
    // it won't be the most precise but will give us a good estimate
    console.log(`Average power: ${gpuAveragePower}w`);
    console.log(`Elapsed Time: ${elapsedTime}ms`);
    const energy = getEnergyConsumed(elapsedTime, gpuAveragePower);
    console.log(`Graphical Processing Unit consumed ${energy}KwH`);
  }
}
