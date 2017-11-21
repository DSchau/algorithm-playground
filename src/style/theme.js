import { darken, lighten, invert } from 'polished';

const dark = {
  base: '#030F01',
  baseSecondary: '#000000',
  text: '#D6FCDB',
  accent: '#94FF00',
  danger: lighten(0.2, '#CD2C24')
};

// const light = {
//   base: '#D6FFC7',
//   baseSecondary: darken(0.05, '#D6FFC7'),
//   text: dark.base,
//   accent: darken(0.4, dark.accent),
//   danger: lighten(0.1, '#CD2C24')
// };

const light = {
  base: lighten(0.075, '#D6FFC7'),
  baseSecondary: '#FFF',
  text: dark.base,
  accent: darken(0.4, dark.accent),
  danger: lighten(0.1, '#CD2C24')
};

export const THEME = {
  dark,
  light,
  primary: 'dark'
};
