// @flow
import { isEmpty } from '../is-empty';

test('it returns true when empty code', () => {
  expect(
    isEmpty(`
function whatever() {}

export function quickSort(arr) {
  return arr;
}
  `)
  ).toBe(true);
});

test('it returns false when non-empty code', () => {
  expect(
    isEmpty(`
function partition() {
  return true;
}

/*
 * Best ALGO ever
 */
export function quickSort(arr) {
  while (true) {
    arr[0] = arr[0];
  }
  return arr;
}
  `)
  ).toBe(false);
});
