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
    this.updateTextarea(props);
  }

  updateTextarea({ algorithm }) {
    const { value } = algorithm;
    this.editor.setValue(value[Object.keys(value).pop()].toString());
  }

  handleChange = ev => {
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
    height: 100%;
  }
`;
