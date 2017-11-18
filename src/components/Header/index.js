import React from 'react';
import styled from 'react-emotion';
import InvertedIcon from 'react-icons/lib/go/light-bulb';

import { Accessible, Selector } from '..';

const Header = styled.header`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px
  padding: 0 0.5rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme[theme.primary].base};
  border-bottom: 1px solid ${({ theme }) => theme[theme.primary].baseSecondary};
  transition: 250ms ease-in-out;
`;

const LightbulbIcon = styled(InvertedIcon)`
  color: ${({ theme }) => theme[theme.primary].text};
  font-size: 24px;
`;

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
