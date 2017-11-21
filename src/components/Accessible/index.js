import React from 'react';
import styled from 'react-emotion';

const Button = styled.button({
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none'
}, ({ theme }) => ({
  ':focus': {
    boxShadow: `0 0 5px ${theme[theme.primary].accent}`
  }
}));

export function Accessible({ render, children = render, onClick, ...rest }) {
  return (
    <Button onClick={onClick} {...rest}>
      {children()}
    </Button>
  );
}
