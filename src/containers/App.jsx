import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from '../reducers';
import { getAllProducts } from '../actions';
import ProductsContainer from '../containers/ProductsContainer';
import CartContainer from '../containers/CartContainer';

const middleware = [thunk, createLogger()];
const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

store.dispatch(getAllProducts());

export default render(
  <Provider store={store}>
    <div className="container">
      <ProductsContainer />
      <hr />
      <CartContainer />
    </div>
  </Provider>,
  document.getElementById('root'),
);
