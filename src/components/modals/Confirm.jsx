import React from 'react';

import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { ModalTrash, ModalExclamation } from '@icons';

const Confirm = ({ title = 'Confirmation', desc, publish = true, action }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {publish ? <ModalExclamation /> : <ModalTrash />}
      <p className="text-primary text-2xl font-bold">{title}</p>
      <p className="text-base text-[#101010]">{desc}</p>
      <div className="flex gap-5">
        <button
          className="text-xs w-24 h-8 rounded-sm border text-primary  border-primary"
          onClick={() => Swal.close()}
        >
          No
        </button>
        <button
          className="text-xs w-24 h-8 rounded-sm text-white bg-primary"
          onClick={action}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

Confirm.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  publish: PropTypes.bool,
  action: PropTypes.func,
};

export default Confirm;
