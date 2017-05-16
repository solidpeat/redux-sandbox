import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';
import { Router } from 'react-router';

import reducer from '../reducers';
// import sagas from '../sagas';
import rootEpic from '../epics';
import routes from '../routes';
import { history } from '../services';

// const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware(rootEpic);
const middleware = [
  // sagaMiddleware,
  epicMiddleware,
  createLogger(),
];
const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);
// sagaMiddleware.run(sagas);

export default render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root'),
);
