import si from "systeminformation";
import { getEnergyConsumed } from "../utils/get-energy-consumed.js";
import { readImageFile } from "../utils/read-image-file.js";
import { TimeManager } from "../models/time-manager.js";

export async function getPowerConsumptionByGraphicsCard() {
  const FULL_SIZE_IMG_PATH = "./resources/sunset.jpeg";
  const COMPRESSED_IMG_PATH = "./resources/sunset_thumbnail.jpeg";
  const GPU_UTILIZATION_CHECK_RATE = 5000;
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

async function getPowerDrawnByGPU() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const powerDrawn = await si
          .graphics()
          .then((data) => data.controllers[0].powerDraw);
        resolve(powerDrawn);
      } catch (error) {
        reject(error);
      }
    })();
  });
}
