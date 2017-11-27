import React, { Component } from 'react';
import queryString from 'query-string';
import createHistory from 'history/createBrowserHistory';
import ALGORITHMS from '../../algorithms';

import { capitalize, compress, decompress, getAlgorithm } from '../../util';
import { THEME } from '../../style';

export class Provider extends Component {
  constructor(props) {
    super(props);

    const query = queryString.parse(location.search);
    const { algorithm, code, theme } = query;

    const algorithmName = ALGORITHMS[algorithm] ? algorithm : 'quickSort';

    const defaultAlgorithm = {
      key: algorithmName,
      value: code ? decompress(code) : ALGORITHMS[algorithmName]
    };

    this.state = {
      defaultAlgorithm,
      algorithm: defaultAlgorithm,
      history: createHistory(),
      localChanges: this.hasLocalChanges({
        algorithm: defaultAlgorithm,
        query
      }),
      query,
      theme: {
        ...THEME,
        primary: theme || 'dark'
      }
    };
  }

  handleAlgorithmChange = algorithmName => {
    const { history, query: { theme } } = this.state;
    const algorithm = getAlgorithm(algorithmName, ALGORITHMS);
    const query = {
      algorithm: algorithm.key,
      theme
    };
    history.replace({
      code: '',
      search: queryString.stringify(query)
    });
    this.setState({
      algorithm,
      localChanges: false,
      query: query
    });
  };

  handleAlgorithmUpdate = value => {
    const { algorithm, history, query } = this.state;
    let params = query;
    if (value !== ALGORITHMS[algorithm.key]) {
      params = {
        ...params,
        code: compress(value)
      };
      history.replace({
        search: queryString.stringify(params)
      });
    }
    const newAlgorithm = {
      ...algorithm,
      value
    };
    this.setState({
      algorithm: newAlgorithm,
      localChanges: this.hasLocalChanges({
        algorithm: newAlgorithm,
        query: params
      }),
      query: params
    });
  };

  handleDiscard = () => {
    const query = {
      ...this.state.query,
      code: ``
    };
    this.state.history.replace({
      search: queryString.stringify(query)
    });
    const { key: algorithmName } = this.state.algorithm;
    this.setState({
      algorithm: {
        ...this.state.algorithm,
        value: ALGORITHMS[algorithmName]
      },
      localChanges: false,
      query
    });
  };

  handleThemeChange = primary => {
    const query = {
      ...this.state.query,
      theme: primary
    };
    this.state.history.replace({
      search: queryString.stringify(query)
    });
    this.setState({
      query,
      theme: {
        ...this.state.theme,
        primary
      }
    });
  };

  handleTimerComplete = () => {
    window.location.reload();
  };

  hasLocalChanges({ algorithm, query } = this.state) {
    const { key: name } = algorithm;
    const { code } = query;

    if (!code) {
      return false;
    }
    return decompress(code) !== ALGORITHMS[name].value;
  }

  render() {
    const { render, children = render } = this.props;
    return children({
      actions: {
        handleAlgorithmChange: this.handleAlgorithmChange,
        handleAlgorithmUpdate: this.handleAlgorithmUpdate,
        handleDiscard: this.handleDiscard,
        handleThemeChange: this.handleThemeChange,
        handleTimerComplete: this.handleTimerComplete
      },
      algorithms: ALGORITHMS,
      ...this.state
    });
  }
}
