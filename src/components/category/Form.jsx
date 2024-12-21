import React from 'react';

import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { Download } from '@icons';

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form disiapkan! Kirimkan ke endpoint setelah diketahui.');
  };

  return (
    <div className="max-w-[529px] mt-5 flex flex-col">
      <h2 className="text-lg font-bold mb-10 self-start">Add Category</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-sm self-start" htmlFor="category-name">
            Category Name
          </label>
          <input
            className="border rounded-md py-3 px-4 text-sm bg-surface-background"
            id="category-name"
            name="category-name"
            placeholder="Enter Category Name"
            type="text"
          />
        </div>
        <div className="border-2 bg-surface-background py-3 px-4 rounded-lg space-y-3 flex flex-col">
          <p className="text-sm self-start">Category Icon</p>
          <div
            className="border-dashed border-2 border-primary rounded-md flex flex-col items-center justify-center gap-2 text-sm py-2"
            id="category-icon"
          >
            <div>
              <Download />
            </div>
            <div className="text-center text-black">
              <p>
                <span className="text-primary">Click to Upload</span> or drag
                and drop
              </p>
              <p>SVG, PNG, JPG</p>
              <p className="text-[#89868D]">(max, 800x400px)</p>
            </div>
          </div>
        </div>
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
