import { readImageFile } from "../utils/read-image-file.js";

export async function getPowerConsumptionByCompressionApproach() {
  // We can get the power consumption by identifying that if we want to render, download, export, etc. an image,
  // then as its size or resolution increases, then so does processing power and consumption do
  // We do rely on the following formula: Consumed Power = Voltage * Intensity * Time in order to make this comparison

  const FULL_SIZE_IMG_PATH = "./resources/sunset.jpeg";
  const COMPRESSED_IMG_PATH = "./resources/sunset_thumbnail.jpeg";

  let fullSizeImageBuffer;
  try {
    fullSizeImageBuffer = await readImageFile(FULL_SIZE_IMG_PATH);
  } catch (error) {
    fullSizeImageBuffer = null;
  }

  console.log("fullSizeImageBuffer");
  console.log(fullSizeImageBuffer);
}
