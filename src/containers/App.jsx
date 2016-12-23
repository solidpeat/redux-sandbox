import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from '../reducers';
import ProductsContainer from '../containers/ProductsContainer';

const store = createStore(reducer);

export default render(
  <Provider store={store}>
    <ProductsContainer />
  </Provider>,
  document.getElementById('root'),
);
