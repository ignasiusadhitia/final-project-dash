import React from 'react';

import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `p-5 border rounded-md shadow-md w-full h-full bg-white ${className}`
      )}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
