const path = require('path');
const fs = require('fs');
const camelCase = require('lodash.camelcase');

const capitalize = str =>
  camelCase(str)
    .replace(/([A-Z])/g, ' $1')
    .replace(/^[a-z]/i, letter => letter.toUpperCase());

module.exports = {
  transforms: {
    LIBRARIES(content, options) {
      const EXCLUDE = [/index.js/, /__tests__/, /^\./];
      const base = path.join(process.cwd(), 'src/algorithms');
      return fs.readdirSync(base)
        .filter(fileOrDirectory => EXCLUDE.every(expr => !expr.test(fileOrDirectory)))
        .sort()
        .map(algorithm => `- [${capitalize(algorithm.replace('.js', ''))}](./src/algorithms/${algorithm})`)
        .join('\n');
    }
  }
};
