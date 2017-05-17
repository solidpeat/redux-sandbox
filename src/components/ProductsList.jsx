import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ProductsList = ({ title, getAllProductsAction, requestCount, children }) => (
  <div>
    <h3>
      {title}
      <Button
        bsStyle="success"
        bsSize="xsmall"
        onClick={getAllProductsAction}
      >
        更新 ({requestCount})
      </Button>
    </h3>
    <div>{children}</div>
  </div>
);

ProductsList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default ProductsList;
