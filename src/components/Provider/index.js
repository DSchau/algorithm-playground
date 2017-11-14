import React, { Component } from 'react';
import ALGORITHMS from '../../algorithms';

import { getAlgorithm } from '../../util';
import { THEME } from '../../style';

export class Provider extends Component {
  state = {
    algorithm: {
      label: 'Quick Sort',
      value: ALGORITHMS.sorting.quickSort
    },
    theme: THEME
  };

  handleAlgorithmChange = algorithm => {
    this.setState({
      algorithm: getAlgorithm(algorithm, ALGORITHMS)
    })
  };

  handleThemeChange = primary => {
    this.setState({
      theme: {
        ...this.state.theme,
        primary
      }
    });
  }

  render() {
    const { render, children = render } = this.props;
    const { algorithm, theme } = this.state;
    return children({
      actions: {
        handleAlgorithmChange: this.handleAlgorithmChange,
        handleThemeChange: this.handleThemeChange
      },
      algorithm,
      algorithms: ALGORITHMS,
      defaultAlgorithm: 'Quick Sort',
      theme
    });
  }
}
