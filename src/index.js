// @flow
import 'proxy-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css';
import 'typeface-montserrat';
import 'typeface-bitter';

import { App } from './components';

const root: Element = (document.getElementById('root'): any);

ReactDOM.render(<App />, root);
