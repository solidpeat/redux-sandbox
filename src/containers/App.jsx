import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from '../reducers';
import ProductsContainer from '../containers/ProductsContainer';

const middleware = [thunk, createLogger()];
const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

export default render(
  <Provider store={store}>
    <ProductsContainer />
  </Provider>,
  document.getElementById('root'),
);
