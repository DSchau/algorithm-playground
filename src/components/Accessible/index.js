// @flow
import * as React from 'react';
import styled from 'react-emotion';

const Button = styled.button(
  {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none'
  },
  ({ theme }) => ({
    ':focus': {
      boxShadow: `0 0 5px ${theme[theme.primary].accent}`
    }
  })
);

type RenderProps = { render(): React.Node };
type ChildrenProps = { children(): React.Node };

type Props = (RenderProps | ChildrenProps) & {
  ariaLabel?: ?string,
  onClick: () => void,
  [key: string]: any
};

export function Accessible(props: Props) {
  const { onClick, ...rest } = props;
  const renderer = props.render ? props.render : props.children;
  return (
    <Button onClick={onClick} {...rest}>
      {renderer()}
    </Button>
  );
}
