import * as STYLE from '..';

test('it has expected exports', () => {
  expect(Object.keys(STYLE)).toMatchSnapshot();
});
