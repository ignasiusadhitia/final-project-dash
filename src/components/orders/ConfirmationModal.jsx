import React from 'react';

import PropTypes from 'prop-types';

import { ExclamationCircle } from '@icons';

const ConfirmationModal = ({ onShowConfirmationHandler }) => {
  return (
    <div className="w-screen h-screen bg-[#101010] bg-opacity-40 absolute top-0 left-0 flex justify-center items-center">
      <div className="max-w-[440px] py-10 px-20 bg-white rounded-[1.25rem] flex flex-col items-center">
        <div className="flex flex-col items-center">
          <ExclamationCircle />
          <h1 className="text-[#DC3741] font-['Nunito'] font-bold text-2xl mt-7">
            Confirmation
          </h1>
          <p className="text-[#101010] mt-3">
            Are you sure want to decline this order?{' '}
          </p>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            className="w-[100px] h-8 flex justify-center items-center border-[1px] border-primary rounded text-[12.64px] text-primary hover:text-white hover:bg-primary"
            onClick={onShowConfirmationHandler}
          >
            No
          </button>
          <button
            className="w-[100px] h-8 flex justify-center items-center bg-primary text-white rounded hover:bg-primary-dark text-[12.64px]"
            onClick={onShowConfirmationHandler}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  onShowConfirmationHandler: PropTypes.func,
};

export default ConfirmationModal;
