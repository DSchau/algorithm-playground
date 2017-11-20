import React from 'react';
import styled from 'react-emotion';

import { SANS_SERIF } from '../../style';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem',
  boxSizing: 'border-box'
}, ({ theme }) => [
  {
    backgroundColor: theme[theme.primary === 'dark' ? 'light' : 'dark'].base
  }
]);

const Message = styled.p({
  margin: 0,
  padding: 0,
  fontFamily: SANS_SERIF
}, ({ theme }) => ({
  color: theme[theme.primary === 'dark' ? 'light' : 'dark'].text
}));

const Button = styled.button({
  boxSizing: 'border-box',
  fontSize: 16,
  padding: '0.5rem 1rem',
  fontFamily: SANS_SERIF,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginLeft: 'auto'
}, ({ theme }) => {
  const opposite = theme[theme.primary === 'dark' ? 'light' : 'dark'];
  return [
    {
      backgroundColor: opposite.text,
      color: opposite.base,
      border: 'none',
      outline: 'none'
    }
  ];
});

export function ResetChanges({ onDiscard }) {
  return (
    <Container>
      <Message>You have local changes</Message>
      <Button onClick={onDiscard}>Discard</Button>
    </Container>
  );
}
