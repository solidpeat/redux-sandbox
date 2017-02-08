import { combineReducers } from 'redux';
import products, * as fromProducts from './products';
import cart, * as fromCart from './cart';

export default combineReducers({
  products,
  cart,
});

const getAddedIds = state => fromCart.getAddedIds(state.cart);
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id);
const getProduct = (state, id) => fromProducts.getProduct(state.products, id);

export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + (getProduct(state, id).price * getQuantity(state, id)),
      0,
    )
    .toFixed();

export const getCartProducts = state =>
  getAddedIds(state).map(id => (Object.assign(
    getProduct(state, id),
    { quantity: getQuantity(state, id) },
  )));
