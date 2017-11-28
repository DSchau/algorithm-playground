// @flow
import * as React from 'react';
import OfflinePlugin from 'offline-plugin/runtime';

export function handleOffline({ onUpdated = () => {} }: any) {
  if (process.env.NODE_ENV === 'production') {
    OfflinePlugin.install({
      onUpdateReady() {
        OfflinePlugin.applyUpdate();
      },

      onUpdated
    });
  }
}

type RenderProps = {| render(updated: boolean): React.Node |};
type ChildrenProps = {| children(updated: boolean): React.Node |};

type Props = RenderProps | ChildrenProps;

interface State {
  updated: boolean;
}

export class Offline extends React.Component<Props, State> {
  state = {
    updated: false
  };

  componentWillMount() {
    handleOffline({
      onUpdated: this.handleOnUpdate
    });
  }

  handleOnUpdate = () => {
    this.setState({
      updated: true
    });
  };

  render() {
    const renderer = this.props.render
      ? this.props.render
      : this.props.children;
    return renderer(this.state.updated);
  }
}
