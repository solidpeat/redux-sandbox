import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Cart from './Cart';

storiesOf('Cart', module)
  .add('default', () => {
    const products = [
      { id: 1, title: '商品名1', price: 200, quantity: 1, },
      { id: 2, title: '商品名2', price: 100, quantity: 3, },
    ];
    return (
      <Cart
        products={products}
        total="500"
        onCheckoutClicked={linkTo('Cart', 'empty')}
      />
    );
  })
  .add('empty', () => (
    <Cart
      products={[]}
      total="0"
      onCheckoutClicked={action('onCheckoutClicked')}
    />
  ))
  ;
