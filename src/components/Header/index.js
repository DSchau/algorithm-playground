// @flow
import React from 'react';
import styled from 'react-emotion';
import InvertedIcon from 'react-icons/lib/go/light-bulb';

import { Accessible, Selector } from '..';
import { ThemeProps } from '../../style';

const Header = styled.header(
  {
    flex: '0 0 auto',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    padding: '0 0.5rem',
    boxSizing: 'border-box',
    transition: '300ms cubic-bezier(0.39, 0.575, 0.565, 1)'
  },
  ({ theme }) => ({
    backgroundColor: theme[theme.primary].base,
    borderBottom: `1px solid ${theme[theme.primary].baseSecondary}`
  })
);

const LightbulbIcon = styled(InvertedIcon)(
  {
    fontSize: 24
  },
  ({ theme }) => ({
    color: theme[theme.primary].text
  })
);

interface Algorithm {
  key: string;
  value: string;
}

interface Props {
  defaultAlgorithm: any;
  algorithms: any[];
  onAlgorithmChange: (algorithm: string) => void;
  onThemeChange: (theme: string) => void;
  theme: ThemeProps;
}

function HeaderComponent({
  defaultAlgorithm,
  algorithms,
  onAlgorithmChange,
  onThemeChange,
  theme
}: Props) {
  const opposite = theme.primary === 'dark' ? 'light' : 'dark';
  return (
    <Header>
      <Selector
        defaultValue={defaultAlgorithm}
        items={algorithms}
        onAlgorithmChange={onAlgorithmChange}
      />
      <Accessible
        ariaLabel={`Toggle ${opposite} mode`}
        onClick={() => onThemeChange(opposite)}
        render={() => <LightbulbIcon />}
      />
    </Header>
  );
}

export { HeaderComponent as Header };
