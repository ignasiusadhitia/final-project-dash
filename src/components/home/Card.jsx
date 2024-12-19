import React from 'react';

import PropTypes from 'prop-types';

const Card = ({ children, className }) => {
  return (
    <div className={`p-5 border rounded-md shadow-md ${className}`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
