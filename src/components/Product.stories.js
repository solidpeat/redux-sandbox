import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Product from './Product';

storiesOf('Product', module)
  .add('default', () => (
    <Product title="商品名" price="100"/>
  ))
  .add('with quahtity', () => (
    <Product title="商品名" price="100" quantity="5"/>
  ))
  ;
