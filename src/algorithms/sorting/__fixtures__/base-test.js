export default function baseTestSuite(sort) {
  test('it returns original array if length 0', () => {
    expect(sort([])).toEqual([]);
  });

  test('it returns input array if length 1', () => {
    expect(sort([1])).toEqual([1]);
  });

  test('it sorts array of numbers', () => {
    const arr = [5, 1, 2, 4, 3, 0];
    expect(sort(arr)).toEqual(arr.sort());
  });

  test('it sorts array with duplicates', () => {
    const arr = [5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 1];
    expect(sort(arr)).toEqual(arr.sort());
  });

  test('it sorts array of strings', () => {
    const arr = 'The quick brown fox jumps over the lazy dog'
      .toLowerCase()
      .split(' ');
    expect(sort(arr)).toEqual(arr.sort());
  });
}
