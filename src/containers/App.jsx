import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import reducer from '../reducers';
import api from '../middleware/api';
import routes from '../routes';

const middleware = [thunk, api, createLogger()];
const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);
const history = syncHistoryWithStore(browserHistory, store);

export default render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root'),
);
