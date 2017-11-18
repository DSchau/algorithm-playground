import camelCase from 'lodash.camelcase';

const exclude = [/__tests__/, /__fixtures__/, /index\.js$/];

let algorithms = {};

const req = require.context('.', true, /\.js$/);
const keys = req.keys().filter(key => !exclude.some(expr => expr.test(key)));

keys.forEach(key => {
  const [name] = key.replace('./', '').split('.');
  algorithms[camelCase(name.replace(/\..+/, ''))] = req(key)
});

export default algorithms;
