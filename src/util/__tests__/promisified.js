import { pRequestAnimationFrame } from '../promisified';

beforeEach(() => {
  global.requestAnimationFrame = jest.fn();
});

test('it promisifies requestAnimationFrame', () => {
  requestAnimationFrame.mockReturnValueOnce(callback => callback());

  pRequestAnimationFrame();

  expect(requestAnimationFrame).toHaveBeenCalledWith(expect.any(Function));
});
