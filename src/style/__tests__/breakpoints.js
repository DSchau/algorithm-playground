import * as BREAKPOINTS from '../breakpoints';

test('it has expected breakpoints', () => {
  expect(Object.keys(BREAKPOINTS)).toMatchSnapshot();
});
