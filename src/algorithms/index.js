import camelCase from 'lodash.camelcase';

let algorithms = {};

const req = require.context('.', true, /\.js$/);
const keys = req.keys().filter(key => !key.match('index'));

keys.forEach(key => {
  const [folder, name] = key.replace('./', '').split('/');
  algorithms[folder] = {
    ...(algorithms[folder] || {}),
    [camelCase(name.replace(/\..+/, ''))]: req(key)
  };
});

export default algorithms;
