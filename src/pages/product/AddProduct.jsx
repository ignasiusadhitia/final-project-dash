import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
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

import 'ckeditor5/ckeditor5.css';
import { AddButton, Delete, PlusButton } from '@icons';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [variant, setVariant] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [variants, setVariants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variantName, setVariantName] = useState('');
  const [variantNames, setVariantNames] = useState([]);
  const [variantValue, setVariantValue] = useState('');
  const [defaultImageIndex, setDefaultImageIndex] = useState(null);



  // Change the photo state to an array
  const [photos, setPhotos] = useState([]);

  // Update the onDrop callback
  const onDrop = useCallback((acceptedFiles) => {
    setPhotos(prev => [...prev, ...acceptedFiles]);
  }, []);

  // Add a function to remove specific photos
  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };


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

  const handleAddVariantName = () => {
    if (variantName.trim()) {
      setVariantNames([...variantNames, variantName]);
      setVariantName('');
    }
  };

  const handleDeleteVariantName = (index) => {
    setVariantNames(variantNames.filter((_, i) => i !== index));
  };

  const handleAddVariantValue = (variantName) => {
    // Handle adding values for specific variant name
    console.log(`Add value for ${variantName}`);
  };

  // Add this function to handle adding variants
  const handleAddVariant = () => {
    setVariants([...variants, {
      name: variantName,
      value: variantValue
    }]);
    setVariantName('');
    setVariantValue('');
    setIsModalOpen(false);
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
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                placeholder="Enter Product Name"
                required
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
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                required
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
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                placeholder="Enter SKU Product"
                required
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Product Variant
              </label>
              <div className="relative">
                <input
                  className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                  type="text"
                  value={variant}
                  readOnly
                  onClick={() => setIsModalOpen(true)}
                />
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-red-500 hover:text-red-600"
                >
                  <AddButton className="w-5 h-5 me-2" />
                  Add New Product Variant
                </button>
              </div>
              {variants.length > 0 && (
                <div className="mt-2 space-y-1">
                  {variants.map((variant, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {variant.name}: {variant.value}
                    </div>
                  ))}
                </div>
              )}
            </div>


            {/* Add Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-[600px]">
                  <h3 className="text-lg font-semibold mb-4">Add Variant</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Variant Name</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={variantName}
                          onChange={(e) => setVariantName(e.target.value)}
                          className="border rounded-md w-full p-2 bg-gray-100"
                          placeholder="e.g. Size, Color"
                        />
                        <button
                          onClick={() => handleAddVariantName}
                          className="ml-2 p-2 bg-red-100 rounded-full hover:bg-red-200"
                        >
                          <PlusButton className="w-6 h-6 " />
                        </button>
                      </div>
                    </div>

                    {/* Variant Names List */}
                    <div className="space-y-2">
                      {variantNames.map((vName, index) => (
                        <div key={index} className="flex items-center justify-between bg-red-50 p-3 rounded">
                          <span className="font-medium">{vName}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddVariantValue(vName)}
                              className="p-1 hover:rounded-full hover:bg-red-200"
                            >
                              <PlusButton className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              onClick={() => handleDeleteVariantName(index)}
                              className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                            >
                              <Delete className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="border border-gray-300 px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddVariant}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Add Variant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}


            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Initial Stock
              </label>
              <input
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                placeholder="Enter Initial Stock"
                required
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
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100"
                placeholder="Enter Price"
                required
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



          {/* product photo */}
          <div className="mb-4 w-1/2 bg-gray-100 p-5 rounded-lg">
            <label className="block text-sm md:text-base font-medium mb-1">
              Product Photo
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed border-red-500 rounded-md p-4 text-center cursor-pointer ${isDragActive ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
            >
              <input {...getInputProps()} multiple />
              <div>
                <p className="text-gray-600">
                  <span className="text-red-500">Click to upload</span> or Drag and drop
                </p>
                <p className="text-lg">SVG, PNG, JPG</p>
                <p className="text-sm text-gray-500">(max, 800x400px)</p>
              </div>
            </div>
          </div>
          {/* Image Preview Section */}
          <div className="mt-4">
            <div className="flex gap-4 mb-5">
              {photos.map((photo, index) => (
                <div key={index} className="relative w-[200px] bg-gray-100 group rounded-lg">
                  <div className="relative w-full h-[150px] rounded-lg p-4">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Product preview ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 bg-white text-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                      type="button"
                    >
                      <Delete />
                    </button>
                    {defaultImageIndex === index && (
                      <div className="absolute top-2 left-2 h-[25px] w-[50px] p-1 text-center text-xs text-white rounded-lg"
                        style={{ background: 'linear-gradient(90deg, #C2A1FD 0%, #9154FD 100%)' }}>
                        Default
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setDefaultImageIndex(index)}
                    className="w-full h-[41px] rounded-b-lg bg-black text-white py-1 px-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    type="button"
                  >
                    Set as Default
                  </button>
                </div>
              ))}

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
