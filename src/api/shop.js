import _products from './products.json';

const TIMEOUT = 100;

export default {
  getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
};
