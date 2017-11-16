import React, { Component } from 'react';
import styled from 'react-emotion';
import Play from 'react-icons/lib/md/play-arrow';
import Replay from 'react-icons/lib/md/replay';

import { createGrid, createRow, updateRow } from '../../util';
import { delay, sortRow } from '../../../../util';

const Container = styled.div`
  height: 100%;
  width: 100%;

  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const StyledIcon = component => styled(component)`
  position: relative;
  z-index: 2;

  font-size: 120px;
  color: white;
`;

class CanvasComponent extends Component {
  state = {
    context: null,
    grid: [],
    height: 400,
    width: 250,
    inProgress: false,
    sorted: false
  };

  componentDidMount() {
    this.setState({
      context: this.canvas.getContext('2d'),
      height: this.container.clientHeight,
      width: this.container.clientWidth
    }, () => {
      this.init();
    });
  }

  init(worker) {
    this.setState({
      grid: createGrid(this.state.context)({ height: this.state.height, width: this.state.width })
    });
  }

  handleClick = async () => {
    this.setState({
      inProgress: true
    }, async () => {
      if (!this.state.sorted) {
        let row = 0;
        while (this.state.grid[row]) {
          const sorted = await sortRow(this.state.grid[row]);

          await delay();

          updateRow(this.state.context)(sorted, row);

          row += 1;
        }

        this.setState({
          inProgress: false,
          sorted: true
        });
      } else {
        this.setState({
          inProgress: false,
          grid: createGrid(this.state.context)({ height: this.state.height, width: this.state.width }),
          sorted: false
        });
      }
    });
  };

  render() {
    const { height, width, inProgress, sorted } = this.state;
    const Icon = StyledIcon(sorted ? Replay : Play);
    return (
      <Container innerRef={node => this.container = node} onClick={this.handleClick}>
        <Canvas
          height={height}
          width={width}
          style={{
            height,
            width
          }}
          innerRef={node => this.canvas = node}
        />
        {!inProgress && <Icon />}
      </Container>
    );
  }
}

export { CanvasComponent as Canvas }
