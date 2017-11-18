import React, { Component } from 'react';
import queryString from 'query-string';
import createHistory from 'history/createBrowserHistory';
import ALGORITHMS from '../../algorithms';

import { capitalize, getAlgorithm } from '../../util';
import { THEME } from '../../style';

export class Provider extends Component {
  constructor(props) {
    super(props);

    const query = queryString.parse(location.search);
    const { algorithm } = query;

    const defaultAlgorithm = ALGORITHMS[algorithm] ? {
      label: capitalize(algorithm),
      value: ALGORITHMS[algorithm]
    } : {
      label: 'Quick Sort',
      value: ALGORITHMS.quickSort
    };

    this.state = {
      defaultAlgorithm,
      algorithm: defaultAlgorithm,
      history: createHistory(),
      query,
      theme: THEME
    };
  }

  handleAlgorithmChange = algorithmName => {
    const { history } = this.state;
    const algorithm = getAlgorithm(algorithmName, ALGORITHMS);
    const query = {
      algorithm: algorithm.label
    };
    history.replace({
      search: queryString.stringify(query)
    });
    this.setState({
      algorithm,
      query
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
    return children({
      actions: {
        handleAlgorithmChange: this.handleAlgorithmChange,
        handleAlgorithmUpdate: this.handleAlgorithmUpdate,
        handleThemeChange: this.handleThemeChange,
        handleTimerComplete: this.handleTimerComplete
      },
      algorithms: ALGORITHMS,
      ...this.state
    });
  }
}
