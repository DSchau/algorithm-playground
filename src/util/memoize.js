export function memoize(fn) {
  let cache = {};
  return function(...args) {
    const joined = args.join(' ');
    if (cache[joined]) {
      return cache[joined];
    }
    return (cache[joined] = fn(...args));
  };
}
