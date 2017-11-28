// @flow
import { darken, lighten, invert, mix } from 'polished';

const dark = {
  base: lighten(0.025, '#030F01'),
  baseSecondary: '#000000',
  text: '#D6FCDB',
  accent: '#94FF00',
  danger: lighten(0.2, '#CD2C24')
};

const light = {
  base: lighten(0.075, '#D6FFC7'),
  baseSecondary: darken(0.1, mix(0.15, 'black', '#D6FFC7')),
  text: dark.base,
  accent: darken(0.4, dark.accent),
  danger: lighten(0.1, '#CD2C24')
};

export const THEME = {
  dark,
  light,
  primary: 'dark'
};

export type Themes = 'dark' | 'light';

export interface Theme {
  base: string;
  baseSecondary: string;
  text: string;
  accent: string;
  danger: string;
}

export interface ThemeProps {
  dark: Theme;
  light: Theme;
  primary: Themes;
}
