import { getAlgorithm } from '../get-algorithm';

const algorithms = {
  quickSort: `lol`,
  bubbleSort: `heh`,
  insertionSort: `Oh hi`
};

test('it returns an algorithm, if found', () => {
  expect(getAlgorithm('quickSort', algorithms)).toEqual({
    key: 'quickSort',
    value: algorithms.quickSort
  });
});

test('it returns fallback, if not found', () => {
  const fallback = { key: 'sup', value: 'neat' };
  expect(
    getAlgorithm('I am not able to be found', algorithms, fallback)
  ).toEqual(fallback);
});
