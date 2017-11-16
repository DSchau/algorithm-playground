let cache = {};
const memoize = (num, getResult) => cache[num] || (cache[num] = getResult());

export function fibonacciIterative(n) {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  }

  let current = 0;
  let next = 1;
  let result = 0;
  for (let i = 2; i <= n; i++) {
    result = current + next;
    current = next;
    next = result;
  }
  return result;
}

export default function fibonacci(n) {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  }

  if (cache[n]) {
    return cache[n];
  }

  const current = n - 1;
  const next = n - 2;

  return (
    memoize(current, () => fibonacci(current)) +
    memoize(next, () => fibonacci(next))
  );
}
