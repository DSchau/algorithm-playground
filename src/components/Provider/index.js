// @flow
import * as React from 'react';
import queryString from 'query-string';
import createHistory from 'history/createBrowserHistory';
import ALGORITHMS from '../../algorithms';

import {
  capitalize,
  compress,
  decompress,
  getAlgorithm,
  hideFunction
} from '../../util';
import { THEME, type Themes, type ThemeProps } from '../../style';
import { type Algorithm, type Algorithms } from '../../interfaces';

interface RenderPropUpdate {
  actions: {
    handleAlgorithmChange: any,
    handleAlgorithmUpdate: any,
    handleDiscard: any,
    handleThemeChange: any,
    handleTimerComplete: any,
    handleVisibilityChange: any
  };
  algorithm: Algorithm;
  algorithms: Algorithm[];
  localChanges: boolean;
  theme: ThemeProps;
}

type RenderProps = {| render(updated: RenderPropUpdate): React.Node |};
type ChildrenProps = {| children(updated: RenderPropUpdate): React.Node |};

type Props = RenderProps | ChildrenProps;

interface State {
  algorithm: Algorithm;
  history: any;
  localChanges: boolean;
  query: {
    [key: string]: string
  };
  theme: ThemeProps;
}

export class Provider extends React.Component<Props, State> {
  constructor(props: Props) {
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

  handleAlgorithmChange = (algorithmName: string) => {
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

  handleAlgorithmUpdate = (value: string) => {
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
        hidden: false,
        value: ALGORITHMS[algorithmName]
      },
      localChanges: false,
      query
    });
  };

  handleThemeChange = (primary: Themes) => {
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

  handleVisibilityChange = (hidden: boolean) => {
    const { algorithm } = this.state;
    if (hidden) {
      hideFunction(algorithm.value).then(value => {
        this.setState({
          algorithm: {
            ...algorithm,
            value,
            hidden
          }
        });
      });
    } else {
      this.handleDiscard();
    }
  };

  hasLocalChanges({ algorithm, query }: any = this.state) {
    const { key: name } = algorithm;
    const { code } = query;

    if (!code) {
      return false;
    }
    const established = ALGORITHMS[name].value;
    return code !== established && decompress(code) !== ALGORITHMS[name].value;
  }

  render() {
    const renderer = this.props.render
      ? this.props.render
      : this.props.children;
    return renderer({
      actions: {
        handleAlgorithmChange: this.handleAlgorithmChange,
        handleAlgorithmUpdate: this.handleAlgorithmUpdate,
        handleDiscard: this.handleDiscard,
        handleThemeChange: this.handleThemeChange,
        handleTimerComplete: this.handleTimerComplete,
        handleVisibilityChange: this.handleVisibilityChange
      },
      algorithms: ALGORITHMS,
      ...this.state
    });
  }
}
