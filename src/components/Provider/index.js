import React, { Component } from 'react';
import ALGORITHMS from '../../algorithms';

import { getAlgorithm } from '../../util';

export class Provider extends Component {
  state = {
    algorithm: {
      label: 'Quick Sort',
      value: ALGORITHMS.sorting.quickSort
    }
  };

  handleAlgorithmChange = algorithm => {
    this.setState({
      algorithm: getAlgorithm(algorithm, ALGORITHMS)
    })
  };

  render() {
    const { render, children = render } = this.props;
    const { algorithm } = this.state;
    return children({
      actions: {
        handleAlgorithmChange: this.handleAlgorithmChange
      },
      algorithm,
      algorithms: ALGORITHMS,
      defaultAlgorithm: 'Quick Sort'
    });
  }
}
