import React, { useState, useCallback } from 'react';

import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Code,
  Alignment,
  Font,
} from 'ckeditor5';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';

import { CKEditor } from '@ckeditor/ckeditor5-react';

import 'ckeditor5/ckeditor5.css';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [variant, setVariant] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setPhoto(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    multiple: false,
    onDrop,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      productName,
      category,
      sku,
      variant,
      stock,
      price,
      description,
      photo,
    });
  };

  return (
    <div className="bg-gray-100 mx-auto my-10 p-4 md:p-8 lg:p-12 w-full">
      <div className="container bg-white p-5 md:p-8 rounded-lg shadow-lg max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Add Product
          </h1>
        </div>

        <nav aria-label="Breadcrumb" className="flex mb-5">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                className="inline-flex items-center text-red-500 hover:text-red-300 text-sm md:text-base"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                <Link
                  className="text-red-500 hover:text-red-300 text-sm md:text-base"
                  to="/product"
                >
                  Product
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-red-500 md:ml-2 text-sm md:text-base">
                  Add Product
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Product Name
              </label>
              <input
                required
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                placeholder="Enter Product Name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Product Category
              </label>
              <select
                required
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled value="">
                  Enter Product Category
                </option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                SKU Product
              </label>
              <input
                required
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                placeholder="Enter SKU Product"
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Product Variant
              </label>
              <input
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                placeholder="Enter Product Variant"
                type="text"
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Initial Stock
              </label>
              <input
                required
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                placeholder="Enter Initial Stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Price
              </label>
              <input
                required
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                placeholder="Enter Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4 col-span-2">
            <label className="block text-sm md:text-base font-medium mb-1">
              Description
            </label>
            <CKEditor
              config={{
                licenseKey: 'GPL',
                plugins: [
                  Essentials,
                  Paragraph,
                  Bold,
                  Italic,
                  Font,
                  Strikethrough,
                  Subscript,
                  Superscript,
                  Underline,
                  Code,
                  Alignment,
                ],
                toolbar: [
                  'undo',
                  'redo',
                  '|',
                  'bold',
                  'italic',
                  'strikethrough',
                  'code',
                  'underline',
                  'alignment',
                ],
                shouldNotGroupWhenFull: true,
              }}
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          </div>
          <div className="mb-4 w-1/2 bg-gray-100 p-5 rounded-lg">
            <label className="block text-sm md:text-base font-medium mb-1">
              Product Photo
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed border-red-500 rounded-md p-4 text-center cursor-pointer ${
                isDragActive ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              {photo ? (
                <div className="flex items-center justify-center">
                  <img
                    alt="Preview"
                    className="max-h-40 object-contain"
                    src={URL.createObjectURL(photo)}
                  />
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">
                    <span className="text-red-500"> Click to upload</span> or
                    Drag and drop
                  </p>
                  <p className="text-lg">SVG, PNG, JPG</p>
                  <p className="text-sm text-gray-500">(max, 800x400px)</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Link
              className="border-2 border-red-500 hover:bg-re-400 text-black font-bold py-2 px-5  md:py-3 md:px-6 rounded text-sm md:text-base"
              to="/product"
            >
              Cancel
            </Link>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded text-sm md:text-base"
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
