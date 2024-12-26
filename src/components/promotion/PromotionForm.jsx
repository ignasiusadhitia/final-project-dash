import React, { useState } from 'react';

import { DatePicker } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  ArrowRightSmall,
  Date,
  ArrowDownGray,
  CloseSelect,
} from '@icons';

const PromotionForm = () => {
  const location = useLocation().pathname.split('/');
  const [promotionType, setPromotionType] = useState('');
  const page = location[location.length - 2];
  const { id } = useParams();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectChange = (e) => {
    const selected = e.target.value;
    if (selected && !selectedProducts.includes(selected)) {
      setSelectedProducts((prev) => [...prev, selected]);
    }
    e.target.value = '';
  };

  const handleRemoveProduct = (product) => {
    setSelectedProducts((prev) => prev.filter((item) => item !== product));
  };

  const handlepromotionType = (event) => {
    setPromotionType(event.target.value);
  };

  const isDetailPage = page === 'detail';

  return (
    <div className="w-full mt-7 bg-[#FFFFFF] px-6 py-4 rounded-3xl">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="flex gap-4 items-center">
            <Link to="/dashboard/promotions">
              <ArrowLeft />
            </Link>
            <h1 className="text-lg font-medium">
              {page === 'detail' ? 'Detail' : id ? 'Edit' : 'Add'} Promotion
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-2 pb-5">
            <Link className="text-primary text-xs font-normal" to="/dashboard">
              Home
            </Link>
            <ArrowRightSmall />
            <Link
              className="text-primary text-xs font-normal"
              to="/dashboard/promotions"
            >
              Promotion
            </Link>
            <ArrowRightSmall />
            <Link className="text-primary text-xs font-normal" to="">
              {page === 'detail'
                ? 'Detail Promotion'
                : id
                  ? 'Edit Promotion'
                  : 'Add Promotion'}
            </Link>
          </div>
        </div>
      </div>

      <div className="py-6 flex flex-col gap-6 border-t border-surface-border">
        <div className="promotion-form grid grid-cols-2 w-full gap-6">
          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="promotion-type">
              Promotion Type
            </label>
            <div className="relative w-full">
              <ArrowDownGray className="absolute right-4 top-1/2 -translate-y-1/2" />
              <select
                className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none appearance-none w-full"
                defaultValue=""
                disabled={isDetailPage}
                id="promotion-type"
                name="promotion-type"
                onChange={handlepromotionType}
              >
                <option disabled value="">
                  Select Promotion Type
                </option>
                <option value="direct-discount">Direct Discount</option>
                <option value="voucher-code">Voucher Code</option>
              </select>
            </div>
          </div>

          {promotionType === 'voucher-code' && (
            <div className="flex flex-col gap-5 w-full">
              <label className="text-[14.22px]" htmlFor="voucher-code">
                Voucher Code
              </label>
              <input
                className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
                disabled={isDetailPage}
                id="voucher-code"
                placeholder="Enter Voucher Code"
                type="text"
              />
            </div>
          )}

          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="promotion-name">
              Promotion Name
            </label>
            <input
              className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              disabled={isDetailPage}
              id="promotion-name"
              placeholder="Enter Promotion Name"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="product">
              Product
            </label>

            <div className="relative z-0 w-full">
              <ArrowDownGray className="absolute right-4 top-1/2 -translate-y-1/2" />
              <select
                className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none appearance-none w-full"
                defaultValue=""
                disabled={isDetailPage}
                id="product"
                name="product"
                onChange={handleSelectChange}
              >
                <option disabled value="">
                  {selectedProducts.length === 0 && 'Select Product'}
                </option>
                <option value="Laptop">Laptop</option>
                <option value="Handphone">Handphone</option>
              </select>
              <div className="absolute z-50 left-3 top-1/2 -translate-y-1/2 flex gap-2 flex-wrap">
                {selectedProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-300 px-3 py-1 rounded-full text-sm gap-2"
                  >
                    <span className="text-[#4C5559] text-[8px] font-medium">
                      {product}
                    </span>
                    <button
                      className="text-black hover:text-red-600"
                      disabled={isDetailPage}
                      type="button"
                      onClick={() => handleRemoveProduct(product)}
                    >
                      <CloseSelect />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="start-date">
              Start Date
            </label>
            <DatePicker
              className="bg-surface-background hover:border-surface-border active-border-surface-border focus-border-surface-border focus:ring-0 text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              disabled={isDetailPage}
              id="start-date"
              placeholder="Select Start Date"
              style={{
                border: '1px solid #DBDCDE',
                outline: 'none',
                boxShadow: 'none',
                background: '#F4F5F9',
              }}
              suffixIcon={<Date />}
              type="date"
            />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="end-date">
              End Date
            </label>
            <DatePicker
              className="bg-surface-background hover:border-surface-border active-border-surface-border focus-border-surface-border focus:ring-0 text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              disabled={isDetailPage}
              id="end-date"
              placeholder="Select End Date"
              style={{
                border: '1px solid #DBDCDE',
                outline: 'none',
                boxShadow: 'none',
                background: '#F4F5F9',
              }}
              suffixIcon={<Date />}
              type="date"
            />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="discount">
              Discount
            </label>
            <div className="relative w-full">
              <ArrowDownGray className="absolute right-4 top-1/2 -translate-y-1/2" />
              <select
                className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none appearance-none w-full"
                defaultValue=""
                disabled={isDetailPage}
                id="discount"
                name="discount"
              >
                <option disabled value="">
                  Select Discount
                </option>
                <option value="A">Discount A</option>
                <option value="B">Discount B</option>
                <option value="C">Discount C</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="promotion-limit">
              Promotion Usage Limit
            </label>
            <input
              className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              disabled={isDetailPage}
              id="promotion-limit"
              placeholder="Promotion Usage Limit"
              type="text"
            />
          </div>

          {promotionType === 'voucher-code' && (
            <div className="flex flex-col justify-center gap-5 w-full col-span-2">
              <label className="flex items-center gap-3 text-base text-[#101010]">
                <input
                  className="w-5 h-5 border-none outline-none ring-none appearance-none checked:appearance-auto rounded border-surface-border bg-[#E6E6E6] focus:ring-0"
                  disabled={isDetailPage}
                  id="show-voucher-checkbox"
                  type="checkbox"
                />
                Show the voucher code on the checkout page
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex gap-5">
          <Link
            className={`flex justify-center items-center rounded-lg w-[100px] text-[12.64px] h-8 border ${isDetailPage ? 'bg-type-text-light text-white' : 'border-primary text-primary'}`}
            to="/dashboard/promotions"
          >
            {isDetailPage ? 'Close' : 'Cancle'}
          </Link>
          {!isDetailPage && (
            <button className="rounded-lg w-[100px] h-8 bg-primary text-[12.64px] text-white">
              {id ? 'Save' : 'Add Promotion'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionForm;
