import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart } from '../actions';
import { getVisibleProducts } from '../reducers/products';
import ProductItem from '../components/ProductItem';
import ProductsList from '../components/ProductsList';

const ProductsContainer = ({ products, addToCartAction }) => (
  <ProductsList title="商品">
    {products.map(product =>
      <ProductItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => addToCartAction(product.id)}
      />,
    )}
  </ProductsList>
);

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
  })).isRequired,
  addToCartAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products),
});

// no-shadow に引っかかる（変数名が同じ）ので別名でconnect
export default connect(
  mapStateToProps,
  { addToCartAction: addToCart },
)(ProductsContainer);
