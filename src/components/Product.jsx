import React, { PropTypes } from 'react';

const Product = ({ price, quantity, title }) => (
  <p>
    {title} - {price}円{quantity ? ` x ${quantity}` : null}
  </p>
);

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
};

export default Product;

