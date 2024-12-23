import React from 'react';

import PropTypes from 'prop-types';

const TableCell = ({ objectValue, onPublish }) => {
  if (typeof objectValue === 'boolean') {
    return (
      <button
        className={`p-[1px] w-10 rounded-full border flex ${
          objectValue ? 'bg-primary justify-end' : 'bg-[#D2D2D2]'
        }`}
        onClick={onPublish}
      >
        <div className="border h-4 w-4 rounded-full bg-white"></div>
      </button>
    );
  }

  if (typeof objectValue === 'string' && objectValue.startsWith('http')) {
    return <img className="h-16 w-16 object-cover" src={objectValue} />;
  }

  return <>{objectValue}</>;
};

TableCell.propTypes = {
  objectValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  onPublish: PropTypes.func,
};
export default TableCell;
