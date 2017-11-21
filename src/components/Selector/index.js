import React, { Component } from 'react';
import styled from 'react-emotion';
import DownIconElement from 'react-icons/lib/md/arrow-drop-down';

import { capitalize } from '../../util';
import { SANS_SERIF, Z_INDEX_PREVIEW_CONTENT } from '../../style';

const SelectContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
});

const Select = styled.select({
  height: 32,
  backgroundColor: 'transparent',
  fontFamily: SANS_SERIF,
  border: '2px solid transparent',
  boxShadow: 'none',
  appearance: 'none',
  fontSize: 20,
  paddingRight: '1.3rem',
  outline: 'none',
  zIndex: Z_INDEX_PREVIEW_CONTENT
}, ({ theme }) => ({
  color: theme[theme.primary].text,
  ':focus': {
    boxShadow: `0 0 5px ${theme[theme.primary].accent}`
  }
}));

const Optgroup = styled.optgroup({
  color: 'black'
});

const Option = styled.option({
  color: 'black'
});

const DownIcon = styled(DownIconElement)({
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)'
}, ({ theme }) => ({
  color: theme[theme.primary].text
}));

export class Selector extends Component {
  handleOnChange = ev => {
    const { target } = ev;
    const { value } = target;
    this.props.onAlgorithmChange(value);
  };

  render() {
    const { defaultValue, items } = this.props;

    const options = Array.isArray(items)
      ? items
      : Object.keys(items).reduce((nested, name) => {
          nested.push({
            key: name,
            label: capitalize(name)
          });
          return nested;
        }, []);


    const value = options.find(({ key }) => key === defaultValue.key);

    return (
      <SelectContainer>
        <Select defaultValue={value.key} onChange={ev => this.props.onAlgorithmChange(ev.target.value)}>
          {options.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
        </Select>
        <DownIcon />
      </SelectContainer>
    );
  }
}
