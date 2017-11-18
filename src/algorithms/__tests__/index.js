import fs from 'fs';
import path from 'path';
import camelCase from 'lodash.camelcase';

const EXCLUDE = [/^__/, /^\./, /index\.js/];

const base = path.join(__dirname, '..');
const files = fs
  .readdirSync(base)
  .filter(file => !EXCLUDE.some(expr => expr.test(file)));

const algorithms = files.map(file => {
  const [name] = file.split('.');
  return [name, require(path.join(base, file))[camelCase(name)]];
});

describe('algorithms', () => {
  algorithms.forEach(([name, sortFunction]) => {
    describe(name, () => {
      test(`returns original array if length 0`, () => {
        expect(sortFunction([])).toEqual([]);
      });

      test(`returns input array if length 1`, () => {
        expect(sortFunction([1])).toEqual([1]);
      });

      test(`sorts array of numbers`, () => {
        const arr = [5, 1, 2, 4, 3, 0];
        expect(sortFunction(arr)).toEqual(arr.sort());
      });

      test(`sorts array with duplicates`, () => {
        const arr = [5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 1];
        expect(sortFunction(arr)).toEqual(arr.sort());
      });

      test(`sorts array of strings`, () => {
        const arr = 'The quick brown fox jumps over the lazy dog'
          .toLowerCase()
          .split(' ');
        expect(sortFunction(arr)).toEqual(arr.sort());
      });
    });
  });
});
