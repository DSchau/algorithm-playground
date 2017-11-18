import React, { Component } from 'react';
import ALGORITHMS from '../../algorithms';

import { getAlgorithm } from '../../util';
import { THEME } from '../../style';

export class Provider extends Component {
  state = {
    algorithm: {
      label: 'Quick Sort',
      value: ALGORITHMS.quickSort
    },
    theme: THEME
  };

  handleAlgorithmChange = algorithm => {
    this.setState({
      algorithm: getAlgorithm(algorithm, ALGORITHMS)
    });
  };

  handleAlgorithmUpdate = value => {
    this.setState({
      algorithm: {
        ...this.state.algorithm,
        value
      }
    });
  };

  handleThemeChange = primary => {
    this.setState({
      theme: {
        ...this.state.theme,
        primary
      }
    });
  };

  handleTimerComplete = () => {
    window.location.reload();
  };

  render() {
    const { render, children = render } = this.props;
    const { algorithm, theme } = this.state;
    return children({
      actions: {
        handleAlgorithmChange: this.handleAlgorithmChange,
        handleAlgorithmUpdate: this.handleAlgorithmUpdate,
        handleThemeChange: this.handleThemeChange,
        handleTimerComplete: this.handleTimerComplete
      },
      algorithm,
      algorithms: ALGORITHMS,
      defaultAlgorithm: 'Quick Sort',
      theme
    });
  }
}
