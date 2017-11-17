import React from 'react';
import styled from 'react-emotion';

const Button = styled.button`
  border: none;
  background-color: transparent;
  outline: none;

  &:focus {
    box-shadow: 0 0 5px ${({ theme }) => theme[theme.primary].accent};
  }
`;

export function Accessible({ render, children = render, onClick, ...rest }) {
  return (
    <Button onClick={onClick} {...rest}>
      {children()}
    </Button>
  );
}
