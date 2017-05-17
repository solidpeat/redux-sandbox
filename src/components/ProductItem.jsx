import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button } from 'react-bootstrap';
import Product from './Product';

const ProductItem = ({ product, onAddToCartClicked }) => (
  <Panel>
    <Product
      title={product.title}
      price={product.price}
    />
    <Button
      onClick={onAddToCartClicked}
      disabled={!product.inventory > 0}
    >
      {product.inventory > 0 ? 'カートに入れる' : '売り切れ'}
    </Button>
  </Panel>
);

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired,
};

export default ProductItem;
