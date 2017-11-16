import React, { Component } from 'react';
import styled from 'react-emotion';

import { transpile } from '../../util';
import { Canvas } from './components';

const Container = styled.div`
  display: flex;
  background-color: #eee;

  height: 100%;
  width: 100%;

  overflow: auto;
`;

export class AlgorithmPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fn: () => {}
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
        fn: transformed
      });
    });
  };

  render() {
    const { fn } = this.state;
    const apply = () => {
      try {
        return JSON.stringify(fn()(['red', 'green', 'blue']));
      } catch {
        return ``;
      }
    };
    return (
      <Container>
        <Canvas theme={this.props.theme} />
      </Container>
    );
  }
}
