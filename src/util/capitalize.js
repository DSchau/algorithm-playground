// @flow
import camelCase from 'lodash.camelcase';

export const capitalize = (str: string) =>
  camelCase(str)
    .replace(/([A-Z])/g, ' $1')
    .replace(/^[a-z]/i, letter => letter.toUpperCase());
