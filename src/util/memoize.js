// @flow
export function memoize(fn: () => void, cache: any = {}) {
  return function(...args: any[]) {
    const joined = args.join(' ');
    if (!cache[joined]) {
      cache[joined] = fn(...args);
    }
    return cache[joined];
  };
}
