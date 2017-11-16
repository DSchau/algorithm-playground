import fibonacci, { fibonacciIterative } from '../fibonacci';

const tables = [
  [2, 1],
  [3, 2],
  [4, 3],
  [5, 5],
  [6, 8],
  [7, 13],
  [8, 21],
  [9, 34],
  [10, 55] // etc
];

const extended = [
  [15, 610],
  [25, 75025],
  [50, 12586269025],
  [75, 2111485077978050]
];

[['recursion', fibonacci], ['iterative', fibonacciIterative]].forEach(
  ([algo, fn]) => {
    describe(algo, () => {
      test('handles negative numbers', () => {
        expect(fn(-100)).toBe(0);
      });

      test('handles 0', () => {
        expect(fn(0)).toBe(0);
      });

      test('handles base case', () => {
        expect(fn(1)).toBe(1);
      });

      test('it handles base tables', () => {
        tables.slice(0).forEach(([n, result]) => {
          expect(fn(n)).toBe(result);
        });
      });

      test('it handles extended tables', () => {
        extended.slice(0).forEach(([n, result]) => {
          expect(fn(n)).toBe(result);
        });
      });
    });
  }
);
