import React, { Component } from 'react';
import styled from 'react-emotion';

import { transpile } from '../../util';
import { Canvas } from './components';

const Container = styled.div({
  display: 'flex',

  height: '100%',
  width: '100%',

  overflow: 'auto'
});

export class AlgorithmPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortFunction: ``
    };
  }

  componentDidMount() {
    this.transformCode(this.props.algorithm);
  }

  componentWillReceiveProps({ algorithm }) {
    this.transformCode(algorithm);
  }

  transformCode = code => {
    return transpile(code).then(transformed => {
      this.setState({
        sortFunction: transformed
      });
    });
  };

  handleSortComplete = sorted => {
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
