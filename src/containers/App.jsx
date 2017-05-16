import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import configureStore from '../configureStore'
import routes from '../routes';
import { history } from '../services';

const store = configureStore('observable');

export default render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root'),
);
