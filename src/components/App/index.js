// @flow
import React from 'react';
import styled, { injectGlobal } from 'react-emotion';

import { CodeEditor, CodePreview, Footer, Header, Provider } from '../';

import { LARGE } from '../../style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.main`
  flex: 1 1 auto;
  position: relative;
  overflow-y: auto;
  width: 100%;

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  ${LARGE`
flex-direction: row;
  `};
`;

export function App() {
  return (
    <Provider
      render={({ actions, algorithm, algorithms, defaultAlgorithm }) => (
        <Container>
          <Header algorithms={algorithms} defaultAlgorithm={defaultAlgorithm} handleAlgorithmChange={actions.handleAlgorithmChange} />
          <Content>
            <CodeEditor algorithm={algorithm} />
            <CodePreview />
          </Content>
          <Footer />
        </Container>
      )}
    />
  );
}

injectGlobal`
  html, body, #root {
    height: 100%;
  }

  body {
    overflow: hidden;
  }
`;
