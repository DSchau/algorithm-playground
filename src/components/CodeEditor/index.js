import React, { Component } from 'react';
import styled, { injectGlobal } from 'react-emotion';
import CodeMirror from 'codemirror';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 100%;

  position: relative;
`;

export const CodeEditor = class extends Component {
  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.textArea, {
      autofocus: true,
      autoCloseBrackets: true,
      mode: 'text/jsx',
      keyMap: 'sublime',
      lineNumbers: true,
      matchBrackets: true,
      tabSize: 2,
      theme: 'dracula'
    });

    this.editor.on('change', this.handleChange);

    this.updateTextarea(this.props);
  }

  componentWillReceiveProps(props) {
    const { theme } = props;
    if (theme.primary !== this.props.theme.primary) {
      this.editor.setOption(
        'theme',
        theme.primary === 'dark' ? 'dracula' : 'default'
      );
    }
    this.updateTextarea(props, this.props.algorithm.key);
  }

  componentWillUnmount() {
    this.editor.off('change', this.handleChange);
    this.editor.toTextArea();
  }

  updateTextarea({ algorithm }) {
    const { value } = algorithm;
    if (value && value !== this.editor.getValue()) {
      this.editor.setValue(value);
    }
  }

  handleChange = ev => {
    const value = ev.getValue();
    if (value !== this.props.algorithm.value) {
      this.props.onUpdate(ev.getValue(), );
    }
  };

  render() {
    return (
      <Container>
        <textarea ref={node => (this.textArea = node)} />
      </Container>
    );
  }
};

injectGlobal`
  .CodeMirror {
    width: 100%;
    max-width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-family: "Operator Mono SSm A", "Operator Mono SSm B", monospace;
    font-size: 12px;

    /* iOS 11+ */
    padding-left: constant(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
    
    /* iOS 11.2+ */
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
`;
