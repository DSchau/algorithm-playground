import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { darken } from 'polished';

import { SANS_SERIF, SLIDE_UP, Z_INDEX_SUPER } from '../../style';

const Container = styled.div`
  position: absolute;
  bottom: 7.5%;
  right: 2.5%;
  width: auto;
  padding: 0.5rem 1rem;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid transparent;
  animation: ${SLIDE_UP} 325ms cubic-bezier(0.39, 0.575, 0.565, 1);
  z-index: ${Z_INDEX_SUPER};
  font-family: ${SANS_SERIF};

  ${({ theme }) => css`
    background-color: ${theme[theme.primary].base};
    border-color: ${darken(0.05, theme[theme.primary].base)};
  `};
`;

const TimerContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 12px;
  display: inline-block;
  text-transform: uppercase;

  color: ${({ theme }) => theme[theme.primary].text};
`;

const Button = styled.button`
  outline: none;
  border-width: 0;
  border-radius: 0.125rem;
  margin-left: 1rem;
  padding: 0.25rem 0.5rem;
  box-sizing: border-box;

  font-family: ${SANS_SERIF};

  ${({ theme }) => css`
    background-color: ${theme[theme.primary].text};
    color: ${theme[theme.primary].base};
  `};
`;

export class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: props.duration / 1000
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const seconds = this.state.seconds - 1;
      let stateUpdatedCallback = () => {};
      if (seconds === 0) {
        clearInterval(this.interval);
        stateUpdatedCallback = this.handleElapsed;
      }
      this.setState(
        {
          seconds
        },
        stateUpdatedCallback
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleElapsed = () => {
    this.props.onElapsed();
  };

  render() {
    if (this.state.seconds === 0) {
      return null;
    }
    return (
      <Container>
        <TimerContainer>
          <Title>Content Updated</Title>
          <Button onClick={this.handleElapsed}>
            Refresh? ({this.state.seconds})
          </Button>
        </TimerContainer>
      </Container>
    );
  }
}
