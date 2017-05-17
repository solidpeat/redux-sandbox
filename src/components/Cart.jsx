import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Product from './Product';

const Cart = ({ products, total, onCheckoutClicked }) => {
  const hasProducts = products.length > 0;
  const nodes = hasProducts ? (
    products.map(product =>
      <Product
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
      />,
    )
  ) : (
    <em>カートが空です。</em>
  );

  return (
    <div>
      <h3>カート</h3>
      <div>{nodes}</div>
      <p>合計: {total}円</p>
      <Button
        bsStyle="success"
        onClick={onCheckoutClicked}
        disabled={!hasProducts}
      >
        購入
      </Button>
    </div>
  );
};

Cart.propTypes = {
  // arrayは禁止らしい forbid-prop-types
  // products: PropTypes.array,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func,
};

export default Cart;
