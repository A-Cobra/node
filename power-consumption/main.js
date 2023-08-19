import { TimeManager } from "./utils/time-manager";

function getPowerConsumptionByCompressionApproach() {
  // We can get the power consumption by identifying that if we want to render, download, export, etc. an image,
  // then as its size or resolution increases, then so does processing power and consumption do
}

function getPowerConsumptionByTimeDrivenApproach() {
  // We can get the power consumption by using the following formula: Consumed Power = Voltage * Intensity * Time
  // This method doesn't rely on third party modules or programs, rather, it takes the basic concept of power and
  // portrays that the change on the algorithms choice can have a vast impact on the power consumption, which would
  // in turn, result in a vast change on carbon emissions

  const unsortedArray1 = [
    "grapefruit",
    "watermelon",
    "kiwi",
    "pineapple",
    "mango",
    "orange",
    "papaya",
    "strawberry",
    "blueberry",
    "raspberry",
    "banana",
    "pear",
    "apple",
    "cherry",
    "peach",
    "plum",
    "apricot",
    "lemon",
    "lime",
    "coconut",
    "avocado",
    "fig",
    "guava",
    "melon",
    "blackberry",
    "cranberry",
    "pomegranate",
    "lychee",
    "dragonfruit",
    "passionfruit",
    "persimmon",
    "nectarine",
    "tangerine",
    "grape",
    "apricot",
    "honeydew",
    "kiwifruit",
    "cantaloupe",
    "starfruit",
    "mulberry",
    "quince",
    "gooseberry",
  ];

  const unsortedArray2 = [...unsortedArray1];

  const timeManager = new TimeManager("Array Sorting");
  bubbleSort(unsortedArray1);
  timeManager.getCurrentTimeMessage();

  timeManager.reset();
  quickSort(unsortedArray2);
  timeManager.getCurrentTimeMessage();
}

function main() {
  console.log("Javascript");

  // getPowerConsumptionByTimeDrivenApproach();
}

main();
