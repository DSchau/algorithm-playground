import { THEME } from '../theme';

test('it has dark theme', () => {
  expect(THEME.dark).toBeDefined();
});

test('it has light theme', () => {
  expect(THEME.light).toBeDefined();
});

test('it chooses a primary theme', () => {
  expect(THEME.primary).toEqual(expect.any(String));
});
