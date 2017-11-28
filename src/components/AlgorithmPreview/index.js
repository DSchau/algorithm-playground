// @flow
import * as React from 'react';
import styled from 'react-emotion';

import { transpile } from '../../util';
import { type ThemeProps } from '../../style';
import { Canvas } from './components';

const Container = styled.div({
  display: 'flex',

  height: '100%',
  width: '100%',

  overflow: 'auto'
});

interface Props {
  algorithm: string;
  localChanges: boolean;
  theme: string;
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
    this.transformCode(this.props.algorithm);
  }

  componentWillReceiveProps({ algorithm }: Props) {
    this.transformCode(algorithm);
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
    const { localChanges } = this.props;
    const { sortFunction, sorted } = this.state;
    return (
      <Container>
        <Canvas
          localChanges={localChanges}
          sortFunction={sortFunction}
          onSortComplete={this.handleSortComplete}
          theme={this.props.theme}
        />
      </Container>
    );
  }
}
