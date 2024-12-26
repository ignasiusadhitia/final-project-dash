import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({
    productName: '',
    sku: '',
    stock: '',
    category: '',
    price: '',
    description: '',
    variantNames: [],
    photos: []
  });

  useEffect(() => {
    // Simulate fetching product data
    const mockProduct = {
      productName: "Test Product",
      sku: "SKU123",
      stock: 100,
      category: "electronics",
      price: 999,
      description: "<p>Product description</p>",
      variantNames: ["Size", "Color"],
      photos: []
    };
    setProductData(mockProduct);
  }, [id]);

  const sliderSettings = {
    dots: true,
    className: "center",
    infinite: false,
    centerPadding: "10px",
    slidesToShow: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className="bg-gray-100 mx-auto my-10 p-4 md:p-8 lg:p-12 w-full">
      <div className="container bg-white p-5 md:p-8 rounded-lg shadow-lg max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Product Detail
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
                >
                  <path
                    clipRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-red-500 md:ml-2 text-sm md:text-base">
                  Product Detail
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Product Name
              </label>
              <input
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100 cursor-not-allowed"
                value={productData.productName}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Product Category
              </label>
              <input
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100 cursor-not-allowed"
                value={productData.category}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                SKU Product
              </label>
              <input
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100 cursor-not-allowed"
                value={productData.sku}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Product Variant
              </label>
              <div className="grid grid-cols-2 gap-4">
                {productData.variantNames.map((name, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <span className="font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Initial Stock
              </label>
              <input
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100 cursor-not-allowed"
                value={productData.stock}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Price
              </label>
              <input
                className="border rounded-md w-full p-2 md:p-3 bg-gray-100 cursor-not-allowed"
                value={productData.price}
                disabled
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm md:text-base font-medium mb-1">
              Description
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={productData.description}
              disabled={true}
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
            />
          </div>

          {productData.photos.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm md:text-base font-medium mb-1">
                Product Photos
              </label>
              <Slider {...sliderSettings}>
                {productData.photos.map((photo, index) => (
                  <div key={index} className="px-2">
                    <div className="relative w-[200px] bg-gray-100 rounded-lg">
                      <div className="relative w-full h-[150px] rounded-lg p-4">
                        <img
                          src={photo.url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}

          <div className="flex justify-end mt-8">
            <Link
              to="/dashboard/products"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded text-sm md:text-base"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
