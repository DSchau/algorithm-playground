import React, { Component } from 'react';
import styled from 'react-emotion';
import debounce from 'lodash.debounce';
import Play from 'react-icons/lib/md/play-arrow';
import Replay from 'react-icons/lib/md/replay';

import { StatusIcon } from '../StatusIcon';

import { createGrid, updateRowAtPosition } from '../../util';
import {
  delay,
  pRequestAnimationFrame,
  Sortable,
  sortRow
} from '../../../../util';
import { SCALE_IN } from '../../../../style';

const Container = styled.div({
  height: '100%',
  width: '100%',

  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});

const Canvas = styled.canvas`
  position: absolute;

  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: -o-crisp-edges;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
`;

const StyledIcon = component =>
  styled(component)(({ theme }) => ({
    position: 'relative',
    zIndex: 2,
    fontSize: 120,
    color: theme[theme.primary].base,
    animation: `${SCALE_IN} 300ms cubic-bezier(0.39, 0.575, 0.565, 1) both`,
    transition: '300ms cubic-bezier(0.39, 0.575, 0.565, 1)',
    ':hover': {
      color: theme[theme.primary === 'dark' ? 'light' : 'dark'].base,
      fontSize: 140
    }
  }));

const getDelay = (distance, scale = 5000, clamp = 4) =>
  (scale / (distance + scale / 1000)) ^ (1 / clamp);

class CanvasComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cancelled: false,
      context: null,
      grid: [],
      height: 400,
      width: 250,
      inProgress: false,
      sortComplete: false
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
    } else if (
      !this.props.sortFunction ||
      (this.props.sortFunction !== sortFunction && this.state.sortComplete)
    ) {
      this.resetGrid({ inProgress: false });
    }
  }

  handleClick = () => {
    if (this.state.sortComplete) {
      this.resetGrid();
    } else if (!this.state.inProgress) {
      this.setState(
        {
          cancelled: false,
          inProgress: true
        },
        async () => {
          const sortComplete = await this.sortGrid();

          this.setState({
            inProgress: false,
            sortComplete
          });
        }
      );
    } else {
      this.cancel();
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
    const { sortFunction } = this.props;
    const { context, width } = this.state;
    return pRequestAnimationFrame(async () => {
      let allSorted = true;
      return await Promise.all(
        (this.state.grid || []).map(async (row, rowIndex) => {
          const { changes: updates, sorted } = await sortRow(row, sortFunction);

          if (!sorted) {
            allSorted = false;
          }

          let updateIndex = 0;
          while (updateIndex < updates.length) {
            const [blockIndex, hue] = updates[updateIndex];
            updateRowAtPosition(context)({
              cancelled: this.state.cancelled,
              rowIndex,
              blockIndex,
              width,
              hue
            });
            await delay(getDelay(width));
            updateIndex += 1;
          }

          return updates;
        })
      )
        .then(() => {
          this.setState({
            sorted: allSorted
          });
          return true;
        })
        .catch(e => false);
    });
  }

  resetGrid(additionalUpdate) {
    this.setState({
      inProgress: false,
      grid: createGrid(this.state.context)({
        height: this.state.height,
        width: this.state.width
      }),
      sortComplete: false,
      sorted: false,
      validSort: false,
      ...additionalUpdate
    });
  }

  cancel(reset = true) {
    this.setState({
      cancelled: true,
      inProgress: false,
      sortComplete: false,
      sorted: false,
      ...(reset && {
        grid: createGrid(this.state.context)({
          height: this.state.height,
          width: this.state.width
        })
      }: {})
    });
  }

  render() {
    const {
      height,
      width,
      inProgress,
      sortComplete,
      sorted,
      validSort
    } = this.state;
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
        {!inProgress && (
          <StatusIcon sortComplete={sortComplete} isSorted={sorted} />
        )}
      </Container>
    );
  }
}

export { CanvasComponent as Canvas };
