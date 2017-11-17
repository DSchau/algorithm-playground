import { memoize } from '../memoize';

test('it stores result in cache after first hit', () => {
  let cache = {};
  const cached = memoize(num => 5, cache);

  cached(5);

  expect(cache['5']).toBe(5);
});

test('it executes function on cache miss', () => {
  const spy = jest.fn();
  const cached = memoize(spy);

  spy.mockReturnValueOnce(10000);

  cached(5);

  expect(spy).toHaveBeenCalledWith(5);
});

test('it works with multiple arguments', () => {
  const spy = jest.fn();
  let cache = {}
  const cached = memoize(spy, cache);

  spy.mockReturnValueOnce(1000);

  const args = 'uno dos tres'.split(' ');

  cached(...args);

  expect(spy).toHaveBeenCalledWith(...args);
  expect(cache[args.join(' ')]).toBe(1000);
});

test('it retrieves from cache after first hit', () => {
  const spy = jest.fn();
  const cached = memoize(spy);

  spy.mockReturnValueOnce(100);

  cached(10);

  expect(spy).toHaveBeenCalled();

  cached(10);

  expect(spy).toHaveBeenCalledTimes(1);
});
