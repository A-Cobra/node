export function fibonacciNoRecursion(
  index: number,
  cache: number[] = []
): number {
  if (!Number.isInteger(index) || index <= 0) {
    throw new Error("Invalid argument");
  }

  for (let i = 1; i <= index; i++) {
    if (i <= 2) {
      cache[i] = 1;
    } else {
      cache[i] = cache[i - 1] + cache[i - 2];
    }
  }

  return cache[index];
}
