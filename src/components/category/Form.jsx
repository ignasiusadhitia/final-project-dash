import React from 'react';

import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { Dropzone } from '@components';

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form disiapkan! Kirimkan ke endpoint setelah diketahui.');
  };

  return (
    <div className="max-w-[529px] mt-5 flex flex-col">
      <h2 className="text-lg font-bold mb-10 self-start">Add Category</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* CATEGORY NAME */}
        <div className="flex flex-col gap-2">
          <label className="text-sm self-start" htmlFor="category-name">
            Category Name
          </label>
          <input
            required
            className="border rounded-md py-3 px-4 text-sm bg-surface-background"
            id="category-name"
            name="category-name"
            placeholder="Enter Category Name"
            type="text"
          />
          <p className="text-[#f93131] text-xs text-left hidden">
            Category name must be unique
          </p>
        </div>

        {/* CATEGORY ICON */}
        <Dropzone required name="category-icon" />

        {/* FORM BUTTON */}
        <div className="self-end flex gap-2 mt-5 text-xs">
          <button
            className="border px-5 py-2 rounded-md border-primary text-primary"
            type="button"
            onClick={() => Swal.close()}
          >
            Cancel
          </button>
          <button
            className="border px-5 py-1 rounded-md bg-primary text-white"
            type="submit"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
};
export default Form;
