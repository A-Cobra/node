import { fibonacci } from "./utils/fibonacci";
import { fibonacciNoRecursion } from "./utils/fibonacci-no-recursion";

const iterations = 100;
const times = [
  {
    startTime: 0,
    endTime: 0,
  },
  {
    startTime: 0,
    endTime: 0,
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
