jest.mock('../../transpile.worker', () => {
  return class Transpile {};
});

import { transpile } from '../transpile';

test('it is a function', () => {
  expect(transpile).toEqual(expect.any(Function));
});
