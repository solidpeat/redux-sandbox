import * as types from '../constants/ActionTypes';

export const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});

export const getAllProducts = () => ({
  type: types.GET_ALL_PRODUCTS,
});

export const getAllProductsStart = () => ({
  type: types.GET_ALL_PRODUCTS_START,
});

export const getAllProductsFinish = () => ({
  type: types.GET_ALL_PRODUCTS_FINISH,
});

export const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART_UNSAFE,
  productId,
});

export const addToCart = productId => ({
  type: types.ADD_TO_CART,
  productId,
});

export const checkout = products => ({
  type: types.CHECKOUT_REQUEST,
  products,
});

export const checkoutSuccess = cart => ({
  type: types.CHECKOUT_SUCCESS,
  cart,
});
