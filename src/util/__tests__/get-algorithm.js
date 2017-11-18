import { getAlgorithm } from '../get-algorithm';

const algorithms = {
  quickSort: `lol`,
  bubbleSort: `heh`,
  insertionSort: `Oh hi`
};

test('it returns an algorithm, if found', () => {
  expect(getAlgorithm('Quick Sort', algorithms)).toEqual({
    label: 'quickSort',
    value: algorithms.quickSort
  });
});

test('it returns fallback, if not found', () => {
  const fallback = { label: 'sup', value: 'neat' };
  expect(
    getAlgorithm('I am not able to be found', algorithms, fallback)
  ).toEqual(fallback);
});
