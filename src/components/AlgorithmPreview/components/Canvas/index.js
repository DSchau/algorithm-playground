import React, { Component } from 'react';
import styled from 'react-emotion';
import debounce from 'lodash.debounce';
import Play from 'react-icons/lib/md/play-arrow';
import Replay from 'react-icons/lib/md/replay';

import { createGrid, updateRowAtPosition } from '../../util';
import { delay, pRequestAnimationFrame, sortRow } from '../../../../util';
import { SCALE_IN } from '../../../../style';

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

  animation: ${SCALE_IN} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

const getDelay = (distance, scale = 5000, clamp = 4) => (scale / (distance + (scale / 1000))) ^ (1 / clamp);

class CanvasComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      context: null,
      grid: [],
      height: 400,
      width: 250,
      inProgress: false,
      sorted: false
    };

    this.handleResize = debounce(this.handleResize, 50);
  }

  componentDidMount() {
    this.setState({
      context: this.canvas.getContext('2d'),
      height: this.container.clientHeight,
      width: this.container.clientWidth
    });

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps({ localChanges, sortFunction }) {
    if (this.props.localChanges !== localChanges) {
      this.handleResize();
    } else if (!this.props.sortFunction || this.props.sortFunction !== sortFunction && this.state.sorted) {
      this.resetGrid();
      this.setState({
        inProgress: false
      });
    }
  }

  handleClick = () => {
    if (this.state.sorted) {
      this.resetGrid();
    } else {
      this.setState(
        {
          inProgress: true
        },
        async () => {
          await this.sortGrid();

          this.setState({
            inProgress: false,
            sorted: true
          });
        }
      );
    }
  };

  handleResize = () => {
    this.setState(
      {
        height: this.container.clientHeight,
        width: this.container.clientWidth
      },
      () => this.resetGrid()
    );
  };

  sortGrid() {
    return pRequestAnimationFrame(async () => {
      return await Promise.all(
        (this.state.grid || []).map(async (row, rowIndex) => {
          const updates = await sortRow(row, this.props.sortFunction);

          let updateIndex = 0;
          while (updateIndex < updates.length) {
            const [blockIndex, hue] = updates[updateIndex];
            updateRowAtPosition(this.state.context)({
              rowIndex,
              blockIndex,
              width: this.state.width,
              hue
            });
            await delay(getDelay(this.state.width));
            updateIndex += 1;
          }

          return updates;
        })
      );
    });
  }

  resetGrid() {
    this.setState({
      inProgress: false,
      grid: createGrid(this.state.context)({
        height: this.state.height,
        width: this.state.width
      }),
      sorted: false
    });
  }

  render() {
    const { height, width, inProgress, sorted } = this.state;
    const Icon = StyledIcon(sorted ? Replay : Play);
    return (
      <Container
        innerRef={node => (this.container = node)}
        onClick={this.handleClick}
      >
        <Canvas
          height={height}
          width={width}
          style={{
            height,
            width
          }}
          innerRef={node => (this.canvas = node)}
        />
        {!inProgress && <Icon />}
      </Container>
    );
  }
}

export { CanvasComponent as Canvas };
