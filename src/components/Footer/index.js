import React from 'react';
import styled from 'react-emotion';
import Code from 'react-icons/lib/md/code';
import Github from 'react-icons/lib/go/mark-github';

import { SERIF } from '../../style';
import { ResetChanges } from '..';

const Container = styled.div({
  flex: '0 0 auto'
});

const Footer = styled.footer(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 0.5rem',
    boxSizing: 'border-box',
    transition: '300ms cubic-bezier(0.39, 0.575, 0.565, 1)'
  },
  ({ theme }) => ({
    backgroundColor: theme[theme.primary].base,
    borderTop: `1px solid ${theme[theme.primary].baseSecondary}`
  })
);

const Description = styled.h3(
  {
    margin: 0,
    padding: 0,
    fontFamily: SERIF,
    fontSize: '0.8rem',
    textAlign: 'center',
    width: '100%'
  },
  ({ theme }) => ({
    color: theme[theme.primary].text
  })
);

const Link = styled.a({
  margin: 0,
  padding: 0,
  color: 'inherit'
});

const CodeIcon = styled(Code)(
  {
    fontSize: 20
  },
  ({ theme }) => ({
    color: theme[theme.primary].accent
  })
);

const GithubIcon = styled(Github)(
  {
    fontSize: 20
  },
  ({ theme }) => ({
    color: theme[theme.primary].text
  })
);

function FooterComponent({ onDiscard, localChanges }) {
  return (
    <Container>
      {localChanges && <ResetChanges onDiscard={onDiscard} />}
      <Footer>
        <Description>
          Made with <CodeIcon /> by{' '}
          <Link href="https://dustinschau.com" target="_blank" rel="noopener">
            Dustin Schau
          </Link>
        </Description>
        <Link
          href="https://github.com/dschau/algorithm-playground"
          target="_blank"
          rel="noopener"
        >
          <GithubIcon />
        </Link>
      </Footer>
    </Container>
  );
}

export { FooterComponent as Footer };
