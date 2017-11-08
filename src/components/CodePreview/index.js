import React from 'react';
import styled from 'react-emotion';

const Container = styled.div`
  display: flex;
  background-color: #EEE;

  height: 100%;
  width: 100%;
`;

export function CodePreview() {
  return (
    <Container>
      <h1>This is preview content</h1>
    </Container>
  );
}
