// @flow
import * as React from 'react';
import styled from 'react-emotion';

import { transpile } from '../../util';
import { type Themes, type ThemeProps } from '../../style';
import { type Algorithm, type Algorithms } from '../../interfaces';
import { Canvas } from './components';

const Container = styled.div({
  display: 'flex',

  height: '100%',
  width: '100%',

  overflow: 'auto'
});

interface Props {
  algorithms: Algorithms;
  algorithm: Algorithm;
  localChanges: boolean;
  theme: Themes;
}

interface State {
  sorted: boolean;
  sortFunction: string;
}

export class AlgorithmPreview extends React.Component<Props, State> {
  state = {
    sorted: false,
    sortFunction: ``
  };

  componentDidMount() {
    this.transformCode(this.props.algorithm.value);
  }

  componentWillReceiveProps({ algorithm }: Props) {
    this.transformCode(algorithm.value);
  }

  transformCode = (code: string) => {
    return transpile(code).then(transformed => {
      this.setState({
        sortFunction: transformed
      });
    });
  };

  handleSortComplete = (sorted: boolean) => {
    this.setState({
      sorted
    });
  };

  render() {
    const { algorithm, algorithms, localChanges } = this.props;
    const { sortFunction, sorted } = this.state;
    return (
      <Container>
        <Canvas
          algorithms={algorithms}
          algorithm={algorithm}
          localChanges={localChanges}
          sortFunction={sortFunction}
          onSortComplete={this.handleSortComplete}
          theme={this.props.theme}
        />
      </Container>
    );
  }
}
