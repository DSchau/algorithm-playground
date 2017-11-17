import React, { Component } from 'react';
import OfflinePlugin from 'offline-plugin/runtime';

export function handleOffline({ onUpdated = () => {} }) {
  if (process.env.NODE_ENV === 'production') {
    OfflinePlugin.install({
      onUpdateReady() {
        OfflinePlugin.applyUpdate();
      },

      onUpdated
    });
  }
}

export class Offline extends Component {
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
