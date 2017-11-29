// @flow
import React from 'react';
import styled from 'react-emotion';
import InvertedIcon from 'react-icons/lib/go/light-bulb';

import { Accessible, Selector } from '..';
import { Visibility } from './components';
import { ThemeProps } from '../../style';
import { type Algorithm, type Algorithms } from '../../interfaces';

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

const Buttons = styled.div({
  display: 'flex',
  marginLeft: 'auto'
});

const LightbulbIcon = styled(InvertedIcon)(
  {
    fontSize: 24
  },
  ({ theme }) => ({
    color: theme[theme.primary].text
  })
);

interface Props {
  algorithms: Algorithms;
  algorithm: Algorithm;
  defaultAlgorithm: Algorithm;
  onAlgorithmChange: (algorithm: string) => void;
  onThemeChange: (theme: string) => void;
  onAlgorithmVisibilityChange: (visible: boolean) => void;
  theme: ThemeProps;
}

function HeaderComponent({
  algorithm,
  algorithms,
  defaultAlgorithm,
  onAlgorithmChange,
  onAlgorithmVisibilityChange,
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
      <Buttons>
        <Visibility
          hidden={algorithm.hidden}
          onVisibilitySwitch={onAlgorithmVisibilityChange}
        />
        <Accessible
          ariaLabel={`Toggle ${opposite} mode`}
          onClick={() => onThemeChange(opposite)}
          render={() => <LightbulbIcon />}
        />
      </Buttons>
    </Header>
  );
}

export { HeaderComponent as Header };
