import React, { Component } from 'react';
import styled from 'react-emotion';

import { createGrid, createRow } from '../../util';

const Container = styled.div`
  height: 100%;
  width: 100%;

  position: relative;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  position: absolute;

  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: -o-crisp-edges;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
`;

class CanvasComponent extends Component {
  state = {
    height: 400,
    width: 250
  };

  componentDidMount() {

    this.setState({
      height: this.container.clientHeight,
      width: this.container.clientWidth
    }, () => {
      this.init();
    });
  }

  componentWillUnmount() {
    this.context = null;
    this.canvas = null;
    this.grid = [];
  }

  init() {
    this.context = this.canvas.getContext('2d');
    const grid = createGrid(this.context)({ height: this.state.height, width: this.state.width });
  }

  render() {
    const { height, width } = this.state;
    return (
      <Container innerRef={node => this.container = node}>
        <Canvas
          height={height}
          width={width}
          style={{
            height,
            width
          }}
          innerRef={node => this.canvas = node}
        />
      </Container>
    );
  }
}

export { CanvasComponent as Canvas }
