import React from 'react';
import styled from 'react-emotion';
import Code from 'react-icons/lib/md/code';
import Github from 'react-icons/lib/go/mark-github';

import { SERIF } from '../../style';

const Footer = styled.footer`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.5rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme[theme.primary].base};
  border-top: 1px solid ${({ theme }) => theme[theme.primary].baseSecondary};
  transition: 250ms ease-in-out;
`;

const Description = styled.h3`
  margin: 0;
  padding: 0;
  font-family: ${SERIF};
  font-size: 0.8rem;
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme[theme.primary].text};
`;

const Link = styled.a`
  margin: 0;
  padding: 0;
  color: inherit;
`;

const CodeIcon = styled(Code)`
  font-size: 20px;
  color: ${({ theme }) => theme[theme.primary].accent};
`;

const GithubIcon = styled(Github)`
  color: ${({ theme }) => theme[theme.primary].text};
  font-size: 20px;
`;

function FooterComponent() {
  return (
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
  );
}

export { FooterComponent as Footer };
