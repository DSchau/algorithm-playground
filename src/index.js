import 'babel-polyfill';
import 'proxy-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'typeface-montserrat';
import 'typeface-bitter';

import { App } from './components';

ReactDOM.render(<App />, document.getElementById('root'));
