import React from 'react';

import PropTypes from 'prop-types';

const StatusPill = ({ status }) => {
  // Mapping colors based on the status
  const statusColors = {
    created: 'bg-[#DF7B00]',
    process: 'bg-[#2794EB]',
    canceled: 'bg-[#DC3741]',
    completed: 'bg-[#198754]',
  };

  // Define color classes based on status
  const bgColor = statusColors[status] || 'bg-gray-400'; // Default color if status unknown

  return (
    <div className={`py-2 px-3 ${bgColor} w-fit text-[#E8F0FE] rounded-full`}>
      {status}
    </div>
  );
};

StatusPill.propTypes = {
  status: PropTypes.string,
};

export default StatusPill;
