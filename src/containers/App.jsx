import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
// import createLogger from 'redux-logger';
import { Router } from 'react-router';

import reducer from '../reducers';
import sagas from '../sagas';
import routes from '../routes';
import { history } from '../services';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  sagaMiddleware,
  // createLogger(),
];
const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);
sagaMiddleware.run(sagas);

export default render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root'),
);
