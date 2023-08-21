import { TimeManager } from "../models/time-manager.js";
import { readImageFile } from "../utils/read-image-file.js";

export async function getPowerConsumptionByCompressionApproach() {
  // We can get the power consumption by identifying that if we want to render, download, export, etc. an image,
  // then as its size or resolution increases, then so does processing power and consumption do
  // We do rely on the following formula: Consumed Power = Voltage * Intensity * Time in order to make this comparison

  const FULL_SIZE_IMG_PATH = "./resources/sunset.jpeg";
  const COMPRESSED_IMG_PATH = "./resources/sunset_thumbnail.jpeg";
  const PROCESSING_TIMES = 500;

  let fullSizeImageBuffer;
  try {
    fullSizeImageBuffer = await readImageFile(FULL_SIZE_IMG_PATH);
  } catch (error) {
    fullSizeImageBuffer = null;
  }

  let compressedImageBuffer;
  try {
    compressedImageBuffer = await readImageFile(COMPRESSED_IMG_PATH);
  } catch (error) {
    compressedImageBuffer = null;
  }

  if (fullSizeImageBuffer && compressedImageBuffer) {
    const timeManager = new TimeManager("Processing full size image");
    for (
      let index = 0;
      index < PROCESSING_TIMES * fullSizeImageBuffer.length;
      index++
    ) {
      // trivial operation, but anything else could be done
      // Do something with the full size image
      1 + 1;
    }
    console.log(timeManager.getCurrentTimeMessage());
    const timeTakenByProcessingFullImage = timeManager.getCurrentTime();

    timeManager.reset();
    timeManager.setTask("Processing compressed image");
    for (
      let index = 0;
      index < PROCESSING_TIMES * compressedImageBuffer.length;
      index++
    ) {
      // trivial operation, but anything else could be done
      // Do something with the compressed size image
      1 + 1;
    }
    console.log(timeManager.getCurrentTimeMessage());
    const timeTakenByProcessingCompressedImage = timeManager.getCurrentTime();

    console.log(
      "Now that the voltage and intensity are relatively similar for both processes, we can divide each power consumption and get a ratio of energy usage, which would incur as well on carbon emissions."
    );
    console.log(
      `Ratio compressed image / full sized image: ${timeTakenByProcessingCompressedImage}/${timeTakenByProcessingFullImage}`
    );
    console.log(
      `Power consumed by Processing compressed image: Multiplier * ${timeTakenByProcessingCompressedImage} / (1000 * 60 * 60) Kw`
    );
    console.log(
      `Power consumed by Processing full size image: Multiplier * ${timeTakenByProcessingFullImage} / (1000 * 60 * 60) Kw`
    );
  }
}
