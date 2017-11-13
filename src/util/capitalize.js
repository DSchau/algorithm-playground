import camelCase from 'lodash.camelcase';

export const capitalize = str =>
  camelCase(str)
    .replace(/([A-Z])/, ' $1')
    .replace(/^[a-z]/i, letter => letter.toUpperCase());
