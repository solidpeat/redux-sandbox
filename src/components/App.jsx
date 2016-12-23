import React from 'react';
import { render } from 'react-dom';
import ProductItem from './ProductItem';

const product = {
  title: 'masquerade',
  price: 100,
  inventory: 8,
};
const onAddToCartClicked = () => console.log('clicked');

export default render(
  <ProductItem
    product={product}
    onAddToCartClicked={onAddToCartClicked}
  />,
  document.getElementById('root'),
);
