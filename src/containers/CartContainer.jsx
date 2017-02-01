import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTotal, getCartProducts } from '../reducers';
import Cart from '../components/Cart';

const CartContainer = ({ products, total }) => (
  <Cart
    products={products}
    total={total}
  />
);

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  total: PropTypes.string,
};

const mapStateToProps = state => ({
  products: getCartProducts(state),
  total: getTotal(state),
});

export default connect(
  mapStateToProps,
)(CartContainer);
