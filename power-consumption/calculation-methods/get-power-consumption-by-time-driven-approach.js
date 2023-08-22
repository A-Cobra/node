import { TimeManager } from "../models/time-manager.js";
import { unsortedArray } from "../utils/unsorted-array.js";
import { bubbleSort } from "../utils/bubble-sort.js";
import { quickSort } from "../utils/quick-sort.js";

export function getPowerConsumptionByTimeDrivenApproach() {
  // We can get the power consumption by using the following formula: Consumed Power = Voltage * Intensity * Time
  // This method doesn't rely on third party modules or programs, rather, it takes the basic concept of power and
  // portrays that the change on the algorithms choice can have a vast impact on the power consumption, which would
  // in turn, result in a vast change on carbon emissions

  const ARRAY_LENGTH_MULTIPLIER = 10;
  let unsortedArray1 = [];
  // the sample size of the array is too small to have noticeable time differences
  for (let index = 0; index < ARRAY_LENGTH_MULTIPLIER; index++) {
    unsortedArray1 = [...unsortedArray1, ...unsortedArray];
  }
  const unsortedArray2 = [...unsortedArray1];

  const timeManager = new TimeManager("Array Sorting with Bubble Sort");
  bubbleSort(unsortedArray1);
  console.log(timeManager.getCurrentTimeMessage());
  const timeTakenByBubbleSort = timeManager.getCurrentTime();

  timeManager.reset();
  timeManager.setTask("Array Sorting with Quick Sort");
  quickSort(unsortedArray2);
  console.log(timeManager.getCurrentTimeMessage());
  const timeTakenByQuickSort = timeManager.getCurrentTime();

  console.log(
    "Now that the voltage and intensity are relatively similar for both processes, we can divide each power consumption and get a ratio of energy usage, which would incur as well on carbon emissions."
  );
  console.log(
    `Ratio quick sort / bubble sort: ${timeTakenByQuickSort}/${timeTakenByBubbleSort}`
  );
  console.log(
    `Power consumed by quick sort: Multiplier * ${timeTakenByQuickSort} / (1000 * 60 * 60 * 1000) KwH`
  );
  console.log(
    `Power consumed by bubble sort: Multiplier * ${timeTakenByBubbleSort} / (1000 * 60 * 60 * 1000) KwH`
  );
}
