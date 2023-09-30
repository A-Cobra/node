export function fibonacci(index: number, cache: number[] = []): number {
  if (!Number.isInteger(index) || index <= 0) {
    throw new Error("Invalid argument");
  }

  let currentValue;

  if (cache[index]) {
    return cache[index];
  } else if (index <= 2) {
    return 1;
  } else {
    currentValue = fibonacci(index - 2, cache) + fibonacci(index - 1, cache);
    cache[index] = currentValue;
    return currentValue;
  }
}
