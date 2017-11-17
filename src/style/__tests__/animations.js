import * as ANIMATIONS from '../animations';

test('it has expected animations', () => {
  expect(Object.keys(ANIMATIONS)).toMatchSnapshot();
});
