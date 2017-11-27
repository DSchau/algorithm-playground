import React from 'react';
import styled from 'react-emotion';
import InvertedIcon from 'react-icons/lib/go/light-bulb';

import { Accessible, Selector } from '..';

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

function HeaderComponent({
  defaultAlgorithm,
  algorithms,
  onAlgorithmChange,
  onThemeChange,
  theme
}) {
  return (
    <Header>
      <Selector
        defaultValue={defaultAlgorithm}
        items={algorithms}
        onAlgorithmChange={onAlgorithmChange}
      />
      <Accessible
        aria-label={`Toggle ${
          theme.primary === 'dark' ? 'light' : 'dark'
        } mode`}
        onClick={() =>
          onThemeChange(theme.primary === 'dark' ? 'light' : 'dark')
        }
        render={() => <LightbulbIcon />}
      />
    </Header>
  );
}

export { HeaderComponent as Header };
