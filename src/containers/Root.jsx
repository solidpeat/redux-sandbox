import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Root = (props) => {
  const { children } = props;
  return (
    <div>
      <h1>Header</h1>
      <ul>
        <li><Link to="/repo">Repo</Link></li>
        <li><Link to="/user">User</Link></li>
      </ul>
      {children}
    </div>
  );
};

Root.propTypes = {
  children: PropTypes.node,
};

export default Root;
