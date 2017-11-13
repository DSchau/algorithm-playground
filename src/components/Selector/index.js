import React, { Component } from 'react';

import { capitalize } from '../../util';

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
      <select defaultValue={defaultValue} onChange={this.handleOnChange}>
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
      </select>
    );
  }
}
