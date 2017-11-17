import { capitalize } from '../capitalize';

test('it capitalizes a string', () => {
  expect(capitalize('string').charAt(0)).toBe('S');
});

test('it camel cases a string', () => {
  expect(capitalize('some-string')).toBe('Some String');
});
