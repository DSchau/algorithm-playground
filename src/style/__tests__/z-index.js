import * as Z_INDEX from '../z-index';

test('it has expected indices', () => {
  expect(Object.keys(Z_INDEX)).toMatchSnapshot();
});
