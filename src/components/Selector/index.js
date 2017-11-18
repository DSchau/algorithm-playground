import React, { Component } from 'react';
import styled from 'react-emotion';
import DownIconElement from 'react-icons/lib/md/arrow-drop-down';

import { capitalize } from '../../util';
import { SANS_SERIF, Z_INDEX_PREVIEW_CONTENT } from '../../style';

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Select = styled.select`
  height: 32px;
  background-color: transparent;
  color: ${({ theme }) => theme[theme.primary].text};
  font-family: ${SANS_SERIF};
  border: 2px solid transparent;
  box-shadow: none;
  appearance: none;
  font-size: 1.3rem;
  padding-right: 1.3rem;
  outline: none;
  zindex: ${Z_INDEX_PREVIEW_CONTENT};

  &:focus {
    box-shadow: 0 0 5px ${({ theme }) => theme[theme.primary].accent};
  }
`;

const Optgroup = styled.optgroup`
  color: black;
`;

const Option = styled.option`
  color: black;
`;

const DownIcon = styled(DownIconElement)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme[theme.primary].text};
`;

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

    const value = options.find(({ label }) => label === defaultValue.label);

    return (
      <SelectContainer>
        <Select defaultValue={value} onChange={this.handleOnChange}>
          {options.map(item => {
            if (Array.isArray(item)) {
              const [{ group }] = item;
              return (
                <Optgroup key={group} label={group}>
                  {item.map(nestedItem => (
                    <Option key={nestedItem.label}>{nestedItem.label}</Option>
                  ))}
                </Optgroup>
              );
            }
            return <Option key={item.key}>{item.label}</Option>;
          })}
        </Select>
        <DownIcon />
      </SelectContainer>
    );
  }
}
