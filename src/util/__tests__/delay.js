import { delay } from '../delay';

let spy;
beforeEach(() => {
  spy = global.setTimeout = jest.fn();
});

test('it performs an async delay', () => {
  spy.mockReturnValueOnce(callback => callback());
  delay(0);

  expect(spy).toHaveBeenCalledWith(expect.any(Function), 0);
});
