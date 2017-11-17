import * as fonts from '../fonts';

test('it has expected fonts', () => {
  expect(Object.keys(fonts)).toMatchSnapshot();
});
