import React from 'react';
import { render } from 'react-dom';
import ProductsList from './ProductsList';
import ProductItem from './ProductItem';

const products = [
  {
    id: 1,
    title: 'masquerade',
    price: 100,
    inventory: 8,
  },
  {
    id: 2,
    title: 'BOARDING',
    price: 170,
    inventory: 13,
  },
];

export default render(
  <ProductsList title="Products">
    {products.map(product =>
      <ProductItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => console.log(product.id)}
      />,
    )}
  </ProductsList>,
  document.getElementById('root'),
);
