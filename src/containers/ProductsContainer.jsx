import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ProductItem from '../components/ProductItem';
import ProductsList from '../components/ProductsList';

const ProductsContainer = ({ products }) => (
  <ProductsList title="Products">
    {products.map(product =>
      <ProductItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => console.log(product.id)}
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
};

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(
  mapStateToProps,
)(ProductsContainer);
