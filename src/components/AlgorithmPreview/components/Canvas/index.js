import React, { Component } from 'react';
import styled from 'react-emotion';
import Play from 'react-icons/lib/md/play-arrow';
import Replay from 'react-icons/lib/md/replay';

import { createGrid, createRow, updateRow, updateRowAtPosition } from '../../util';
import { delay, sortRow } from '../../../../util';
import { ScaleIn } from '../../../../style';

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
  color: ${({ theme }) => theme[theme.primary].base};

  animation: ${ScaleIn} 0.3s cubic-bezier(.39, .575, .565, 1) both;
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
        await Promise.all((this.state.grid || []).map(async (row, rowIndex) => {
          const updates = await sortRow(row);

          let updateIndex = 0;
          while (updateIndex < updates.length) {
            const [index, block] = updates[updateIndex];
            updateRowAtPosition(this.state.context)(rowIndex, index, block);
            await delay(1);
            updateIndex += 1;
          }

          return updates;
        }));


        // const [row, secondRow] = this.state.grid;
        // const updates = await sortRow(row);
        // let changeIndex = 0;
        // while (changeIndex < updates.length) {
        //   const [index, block] = updates[changeIndex];
        //   updateRowAtPosition(this.state.context)(0, index, block);
        //   await delay(1);
        //   changeIndex += 1;
        // }
        // await Promise.all(this.state.grid.map(async (row, rowIndex) => {
        //   const updates = await sortRow(row);
        //   let changeIndex = 0;
        //   while (changeIndex < updates.length) {
        //     const [index, block] = updates[changeIndex];
        //     updateRowAtPosition(this.state.context)(rowIndex, index, block);
        //     await delay(1);
        //     changeIndex += 1;
        //   }
        //   return row;
        // }));

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
