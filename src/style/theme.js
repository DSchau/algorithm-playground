import { darken, lighten } from 'polished';

const dark = {
  base: '#31353D',
  baseSecondary: '#1C1D21',
  text: '#ddd',
  accent: '#92CDCF',
  danger: lighten(0.2, '#CD2C24')
};

const light = {
  base: '#EEEFF7',
  baseSecondary: darken(0.05, '#EEEFF7'),
  text: '#1E1E20',
  accent: darken(0.2, dark.accent),
  danger: lighten(0.1, '#CD2C24')
};

export const THEME = {
  dark: {
    ...dark,
    textSecondary: darken(0.2, '#ddd')
  },
  light: {
    ...light,
    textSecondary: lighten(0.2, '#1E1E20')
  },
  primary: 'dark'
};
