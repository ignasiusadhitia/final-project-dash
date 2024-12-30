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
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
// SWAL
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import 'ckeditor5/ckeditor5.css';
import { Success } from '@components';
import {
  AddButton,
  Delete,
  PlusButton,
  ArrowLeft,
  ArrowRightSmall,
  ArrowDownGray,
} from '@icons';

const AddProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [variant, setVariant] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variantName, setVariantName] = useState('');
  const [variantNames, setVariantNames] = useState([]);
  const [defaultImageIndex, setDefaultImageIndex] = useState(null);
  const [tempVariantNames, setTempVariantNames] = useState([]);
  // Change the photo state to an array
  const [photos, setPhotos] = useState([]);
  console.log(photos);

  // Update the onDrop callback
  const onDrop = useCallback((acceptedFiles) => {
    setPhotos((prev) => [...prev, ...acceptedFiles]);
  }, []);

  // Add a function to remove specific photos
  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    multiple: true,
    onDrop,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard/products');
    MySwal.fire({
      html: <Success message="This product was successfully added" />,
      customClass: {
        popup: 'rounded-3xl w-auto md:w-[720px]',
      },
      showConfirmButton: false,
      timer: 1000,
    });
    console.log({
      productName,
      category,
      sku,
      variant,
      stock,
      price,
      description,
      photos,
    });
  };

  const handleAddVariantName = () => {
    if (variantName.trim()) {
      setTempVariantNames([...tempVariantNames, variantName]);
      setVariantName('');
    }
  };

  const handleDeleteVariantName = (index) => {
    setVariantNames(variantNames.filter((_, i) => i !== index));
  };

  // const handleAddVariantValue = (variantName) => {
  //   // Handle adding values for specific variant name
  //   console.log(`Add value for ${variantName}`);
  // };

  // Add this function to handle adding variants
  const handleAddVariant = () => {
    setVariant([
      ...variant,
      {
        name: variantName,
        // value: variantValue,
      },
    ]);
    setVariantName('');
    // setVariantValue('');
    setIsModalOpen(false);
  };

  // Add slider settings
  const sliderSettings = {
    dots: false,
    className: 'left',
    infinite: false,
    centerPadding: '10px',
    slidesToShow: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="w-full p-5 flex justify-center items-start">
      <div className="w-full mt-7 bg-[#FFFFFF] px-6 py-4 rounded-3xl">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/products">
            <ArrowLeft />
          </Link>
          <h1 className="text-lg font-medium">Add Product</h1>
        </div>

        <nav aria-label="Breadcrumb" className="flex mt-2 mb-5">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                className="inline-flex items-center text-primary text-xs"
                to="/dashboard"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ArrowRightSmall />
                <Link
                  className="text-primary text-xs font-normal"
                  to="/dashboard/products"
                >
                  Product
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ArrowRightSmall />
                <span className="text-primary text-xs font-normal">
                  Add Product
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <form className="pt-6 border-t" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">Product Name</label>
              <input
                required
                className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none w-full mt-0"
                placeholder="Enter Product Name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">
                Product Category
              </label>
              <div className="relative w-full">
                <ArrowDownGray className="absolute right-4 top-1/2 -translate-y-1/2" />
                <select
                  required
                  className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none appearance-none w-full"
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
            </div>

            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">SKU Product</label>
              <input
                required
                className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none w-full"
                placeholder="Enter SKU Product"
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">
                Product Variant
              </label>
              {variantNames.length === 0 ? (
                <div className="relative">
                  <input
                    readOnly
                    className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none w-full"
                    type="text"
                    value={variant}
                    onClick={() => setIsModalOpen(true)}
                  />
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-primary hover:text-primary-dark"
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <AddButton className="w-5 h-5 me-2" />
                    Add New Product Variant
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4">
                        {variantNames.map((name, index) => (
                          <div
                            key={index}
                            className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none appearance-none w-full"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <button
                        className="p-2 bg-red-100 rounded-full hover:bg-red-200"
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <PlusButton className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
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
                      <label className="block text-sm font-medium mb-1">
                        Variant Name
                      </label>
                      <div className="flex items-center">
                        <input
                          className="border rounded-md w-full p-2 bg-gray-100"
                          placeholder="e.g. Size, Color"
                          type="text"
                          value={variantName}
                          onChange={(e) => setVariantName(e.target.value)}
                        />
                        <button
                          className="ml-2 p-2 bg-red-100 rounded-full hover:bg-red-200"
                          type="button"
                          onClick={() => handleAddVariantName}
                        >
                          <PlusButton className="w-6 h-6 " />
                        </button>
                      </div>
                    </div>

                    {/* Variant Names List */}
                    <div className="space-y-2">
                      {tempVariantNames.map((vName, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-red-50 p-3 rounded"
                        >
                          <span className="font-medium">{vName}</span>
                          <div className="flex gap-2">
                            <button
                              className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                              type="button"
                              onClick={() => handleDeleteVariantName(index)}
                            >
                              <Delete className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        className="border border-gray-300 px-4 py-2 rounded-md"
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        type="button"
                        onClick={handleAddVariant}
                      >
                        Add Variant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">Initial Stock</label>
              <input
                required
                className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none w-full"
                placeholder="Enter Initial Stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">Price</label>
              <input
                required
                className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none w-full"
                placeholder="Enter Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4 col-span-2">
            <label className="block text-[14.22px] mb-5">Description</label>
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
              className={`border-2 border-dashed border-red-500 rounded-md p-4 text-center cursor-pointer ${
                isDragActive ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} multiple />
              <div>
                <p className="text-gray-600">
                  <span className="text-red-500">Click to upload</span> or Drag
                  and drop
                </p>
                <p className="text-lg">SVG, PNG, JPG</p>
                <p className="text-sm text-gray-500">(max, 800x400px)</p>
              </div>
            </div>
          </div>
          {/* Image Preview Section */}
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {photos.map((photo, index) => (
                <div key={index} className="px-2">
                  <div className="relative w-[200px] bg-gray-100 group rounded-lg">
                    <div className="relative w-full h-[150px] rounded-lg p-4">
                      <img
                        alt={`Product preview ${index + 1}`}
                        className="w-full h-full object-contain"
                        src={URL.createObjectURL(photo)}
                      />
                      <button
                        className="absolute top-2 right-2 bg-white text-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                        type="button"
                        onClick={() => removePhoto(index)}
                      >
                        <Delete />
                      </button>
                      {defaultImageIndex === index && (
                        <div
                          className="absolute top-2 left-2 h-[25px] w-[50px] p-1 text-center text-xs text-white rounded-lg"
                          style={{
                            background:
                              'linear-gradient(90deg, #C2A1FD 0%, #9154FD 100%)',
                          }}
                        >
                          Default
                        </div>
                      )}
                    </div>
                    <button
                      className="w-full h-[41px] rounded-b-lg bg-black text-white py-1 px-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      type="button"
                      onClick={() => setDefaultImageIndex(index)}
                    >
                      Set as Default
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              className="flex justify-center items-center rounded-lg w-[100px] text-[12.64px] h-8 border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              to="/dashboard/products"
            >
              Cancel
            </Link>
            <button
              className="rounded-lg w-[100px] h-8 bg-primary text-[12.64px] text-white hover:bg-primary-dark transition-colors"
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
