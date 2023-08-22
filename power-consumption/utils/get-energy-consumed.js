export function getEnergyConsumed(elapsedTime, power) {
  // time is measured in milliseconds and power in wats
  // the function returns a value in KwH
  return (elapsedTime * power) / (1000 * 60 * 60 * 1000);
}
