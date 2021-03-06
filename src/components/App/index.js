// @flow
import React from 'react';
import styled, { injectGlobal } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';

import {
  AlgorithmPreview,
  CodeEditor,
  Footer,
  Header,
  Offline,
  Provider,
  Timer
} from '../';

import { LARGE } from '../../style';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
});

const Content = styled.main({
  flex: '1 1 auto',
  position: 'relative',
  overflowY: 'auto',

  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  maxWidth: '100%',

  ...LARGE({
    flexDirection: 'row'
  })
});

export function App() {
  return (
    <Offline
      render={updated => (
        <Provider
          render={({
            actions,
            algorithm,
            algorithms,
            localChanges,
            query,
            theme
          }) => (
            <ThemeProvider theme={theme}>
              <Container>
                <Header
                  defaultAlgorithm={algorithm}
                  algorithms={algorithms}
                  algorithm={algorithm}
                  onAlgorithmChange={actions.handleAlgorithmChange}
                  onThemeChange={actions.handleThemeChange}
                  onAlgorithmVisibilityChange={actions.handleVisibilityChange}
                  theme={theme}
                />
                <Content>
                  <CodeEditor
                    algorithm={algorithm}
                    onUpdate={actions.handleAlgorithmUpdate}
                    theme={theme}
                  />
                  <AlgorithmPreview
                    algorithms={algorithms}
                    algorithm={algorithm}
                    theme={theme.primary}
                    localChanges={localChanges}
                  />
                </Content>
                <Footer
                  localChanges={localChanges}
                  onDiscard={actions.handleDiscard}
                />
                {updated && (
                  <Timer
                    duration={10000}
                    onElapsed={actions.handleTimerComplete}
                  />
                )}
              </Container>
            </ThemeProvider>
          )}
        />
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
