import React, { Component } from 'react';
import styled from 'react-emotion';
import DownIconElement from 'react-icons/lib/md/arrow-drop-down';

import { capitalize } from '../../util';
import { SANS_SERIF } from '../../style';

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Select = styled.select`
  height: 32;
  background-color: transparent;
  color: ${({ theme }) => theme[theme.primary].text};
  font-family: ${SANS_SERIF};
  border: 2px solid transparent;
  box-shadow: none;
  appearance: none;
  font-size: 1.3rem;
  padding-right: 1.3rem;
  outline: none;
  zIndex: 2;
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
      : Object.keys(items).reduce((nested, group) => {
          const value = items[group];
          nested.push(
            Object.keys(value).reduce((arr, nestedKey) => {
              arr.push({
                group: capitalize(group),
                label: capitalize(nestedKey)
              });
              return arr;
            }, [])
          );
          return nested;
        }, []);

    return (
      <SelectContainer>
        <Select defaultValue={defaultValue} onChange={this.handleOnChange}>
          {options.map(item => {
            if (Array.isArray(item)) {
              const [{ group }] = item;
              return (
                <optgroup key={group} label={group}>
                  {item.map(nestedItem => (
                    <option key={nestedItem.label}>{nestedItem.label}</option>
                  ))}
                </optgroup>
              );
            }
            return <option key={item.label}>{item.label}</option>;
          })}
        </Select>
        <DownIcon />
      </SelectContainer>
    );
  }
}
