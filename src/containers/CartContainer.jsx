import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkout } from '../actions';
import { getTotal, getCartProducts } from '../reducers';
import Cart from '../components/Cart';

const CartContainer = ({ products, total, checkoutAction }) => (
  <Cart
    products={products}
    total={total}
    onCheckoutClicked={() => checkoutAction(products)}
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
  checkoutAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: getCartProducts(state),
  total: getTotal(state),
});

export default connect(
  mapStateToProps,
  { checkoutAction: checkout },
)(CartContainer);