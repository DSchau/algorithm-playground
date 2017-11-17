export function memoize(fn, cache = {}) {
  return function(...args) {
    const joined = args.join(' ');
    if (!cache[joined]) {
      cache[joined] = fn(...args);
    }
    return cache[joined];
  };
}
