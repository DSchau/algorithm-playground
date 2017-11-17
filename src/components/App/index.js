// @flow
import React from 'react';
import styled, { injectGlobal } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';

import { AlgorithmPreview, CodeEditor, Footer, Header, Provider } from '../';

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

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 100%;

  ${LARGE`
flex-direction: row;
  `};
`;

export function App() {
  return (
    <Provider
      render={({ actions, algorithm, algorithms, defaultAlgorithm, theme }) => (
        <ThemeProvider theme={theme}>
          <Container>
            <Header
              algorithms={algorithms}
              defaultAlgorithm={defaultAlgorithm}
              onAlgorithmChange={actions.handleAlgorithmChange}
              onThemeChange={actions.handleThemeChange}
              theme={theme}
            />
            <Content>
              <CodeEditor
                algorithm={algorithm}
                onUpdate={actions.handleAlgorithmUpdate}
                theme={theme}
              />
              <AlgorithmPreview
                algorithm={algorithm.value}
                theme={theme.primary}
              />
            </Content>
            <Footer />
          </Container>
        </ThemeProvider>
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
    max-width: 100%;
  }
`;
