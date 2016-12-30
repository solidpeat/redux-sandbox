import { combineReducers } from 'redux';
import { RECEIVE_PRODUCTS } from '../constants/ActionTypes';

const products = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return Object.assign(
        state,
        // no-param-reassign のエラーになる
        // action.products.reduce((obj, product) => {
        //   obj[product.id] = product;
        //   return obj;
        // }, {}),
        action.products.reduce((obj, product) =>
          Object.assign(obj, { [product.id]: product })
        , {}),
      );
    default: {
      const { productId } = action;
      if (productId) {
        return Object.assign(
          state,
          { [productId]: products(state[productId], action) },
        );
      }
      return state;
    }
  }
};

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleIds,
});

export const getProduct = (state, id) =>
  state.byId[id];

export const getVisibleProducts = state =>
  state.visibleIds.map(id => getProduct(state, id));
