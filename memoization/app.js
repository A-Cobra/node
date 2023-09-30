function fibonacci(index, cache = []) {
  if (!Number.isInteger(index) || index <= 0) {
    throw new InvalidArgumentException();
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

function fibonacciNoRecursion(index, cache = []) {
  if (!Number.isInteger(index) || index <= 0) {
    throw new InvalidArgumentException();
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

const iterations = 100;
const times = [
  {
    startTime: null,
    endTime: null,
  },
  {
    startTime: null,
    endTime: null,
  },
];

times[0].startTime = Date.now();
for (let index = 1; index < iterations + 1; index++) {
  console.log(`Fibonacci for index ${index}: ${fibonacci(index)}`);
}
times[0].endTime = Date.now();

times[1].startTime = Date.now();
for (let index = 1; index < iterations + 1; index++) {
  console.log(`Fibonacci for index ${index}: ${fibonacciNoRecursion(index)}`);
}
times[1].endTime = Date.now();

console.log(
  `Fibonacci with recursion and memoization took ${
    times[0].endTime - times[0].startTime
  }ms`
);

console.log(
  `Fibonacci without recursion and memoization took ${
    times[1].endTime - times[1].startTime
  }ms`
);
