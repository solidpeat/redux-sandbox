import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ProductItem from './ProductItem';

storiesOf('ProductItem', module)
  .add('default', () => {
    const product = { title: '商品名2', price: 200, inventory: 8, };
    return (
      <ProductItem
        key={product.id}
        product={product}
        onAddToCartClicked={action('onAddToCartClicked')}
      />
    );
  })
  ;
