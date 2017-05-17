import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import * as types from '../constants/ActionTypes';
import * as actions from '../actions';
import shop from '../api/shop';


const getAllProductsEpic = action$ =>
  action$.ofType(types.GET_ALL_PRODUCTS)
    .mergeMap(_ => Observable.bindCallback(shop.getProducts)())
    .map(actions.receiveProducts);

const addToCartEpic = (action$, store) =>
  action$.ofType(types.ADD_TO_CART)
    .map(({productId}) => productId) // 最後のmapのために
    .filter(productId => store.getState().products.byId[productId].inventory > 0)
    .map(actions.addToCartUnsafe);

const checkoutEpic = (action$, store) =>
  action$.ofType(types.CHECKOUT_REQUEST)
    .mergeMap(({products}) => Observable.bindCallback(shop.buyProducts)(products))
    .map(_ => store.getState().cart)
    .map(actions.checkoutSuccess);

export default combineEpics(
  getAllProductsEpic,
  addToCartEpic,
  checkoutEpic,
);
