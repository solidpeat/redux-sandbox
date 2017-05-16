import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';

import rootReducer from './reducers';
import rootSaga from './sagas';
import rootEpic from './epics';

export default function configureStore(middlewareName) {
  let asyncMiddleware;

  if (middlewareName == 'saga') {
    asyncMiddleware = createSagaMiddleware();
  } else {
    asyncMiddleware = createEpicMiddleware(rootEpic);
  }

  const middleware = [
    // sagaMiddleware,
    asyncMiddleware,
    createLogger(),
  ];
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  if (middlewareName == 'saga') {
    asyncMiddleware.run(rootSaga);
  }

  return store;
}

