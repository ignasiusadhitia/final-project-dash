import React, { useState, useEffect } from 'react';

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
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import 'ckeditor5/ckeditor5.css';
import { ArrowLeft, ArrowRightSmall } from '@icons';

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
    photos: [],
  });

  useEffect(() => {
    // Simulate fetching product data
    const mockProduct = {
      productName: 'Test Product',
      sku: 'SKU123',
      stock: 100,
      category: 'electronics',
      price: 999,
      description: '<p>Product description</p>',
      variantNames: ['Size', 'Color'],
      photos: [],
    };
    setProductData(mockProduct);
  }, [id]);

  const sliderSettings = {
    dots: true,
    className: 'center',
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
          <h1 className="text-lg font-medium">Product Detail</h1>
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
                  Product Detail
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="pt-6 border-t">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">Product Name</label>
              <input
                disabled
                className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none w-full mt-0 cursor-not-allowed"
                value={productData.productName}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">
                Product Category
              </label>
              <input
                disabled
                className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none w-full mt-0 cursor-not-allowed"
                value={productData.category}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">SKU Product</label>
              <input
                disabled
                className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none w-full mt-0 cursor-not-allowed"
                value={productData.sku}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">
                Product Variant
              </label>
              <div className="grid grid-cols-2 gap-4">
                {productData.variantNames.map((name, index) => (
                  <div
                    key={index}
                    className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none appearance-none w-full"
                  >
                    <span className="font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">Initial Stock</label>
              <input
                disabled
                className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none appearance-none w-full cursor-not-allowed"
                value={productData.stock}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[14.22px] mb-5">Price</label>
              <input
                disabled
                className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none appearance-none w-full cursor-not-allowed"
                value={productData.price}
              />
            </div>
          </div>

          <div className="mb-4">
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
              data={productData.description}
              disabled={true}
              editor={ClassicEditor}
            />
          </div>

          {productData.photos.length > 0 && (
            <div className="mt-4">
              <label className="block text-[14.22px] mb-5">
                Product Photos
              </label>
              <Slider {...sliderSettings}>
                {productData.photos.map((photo, index) => (
                  <div key={index} className="px-2">
                    <div className="relative w-[200px] bg-gray-100 rounded-lg">
                      <div className="relative w-full h-[150px] rounded-lg p-4">
                        <img
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-contain"
                          src={photo.url}
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
              className="flex justify-center items-center rounded-lg w-[100px] text-[12.64px] h-8 border bg-type-text-light text-white transition-colors"
              to="/dashboard/products"
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
