import React, { useState, useEffect } from 'react';

import { DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
// SWAL
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import {
  getPromotionDetail,
  addPromotion,
  // editPromotion,
} from '@store/features/promotionSlice';

import { Success } from '@components';
import {
  ArrowLeft,
  ArrowRightSmall,
  Date,
  ArrowDownGray,
  CloseSelect,
} from '@icons';

const PromotionForm = () => {
  const dispatch = useDispatch();
  // const { data } = useSelector((state) => state.promotion);
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/');
  const page = location[location.length - 2];
  const { id } = useParams();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    promotionType: '',
    promotionName: '',
    product: '',
    startDate: '',
    endDate: '',
    discount: '',
    promotionLimit: '',
    description: '',
    status: 'Active',
    published: false,
  });

  const handleChange = (e, name) => {
    if (e && e.target) {
      const { name, value, type, checked } = e.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    } else if (name) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e, // `e` is date (from date picker)
      }));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getPromotionDetail(id));
    }
  }, [dispatch, id]);

  // useEffect(() => {
  //   if (data) {
  //     setFormData({
  //       promotionType: data.promotionType,
  //       promotionName: data.promotionName,
  //       product: data.product,
  //       startDate: '',
  //       endDate: '',
  //       discount: data.discount,
  //       promotionLimit: data.promotionLimit,
  //       description: data.description,
  //       status: data.status,
  //       published: data.published,
  //     });
  //   }
  // }, [data]);

  const handleRemoveProduct = (product) => {
    setSelectedProducts((prev) => prev.filter((item) => item !== product));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    if (id) {
      MySwal.fire({
        html: <Success message="This promotion was successfully updated" />,
        customClass: {
          popup: 'rounded-3xl w-auto md:w-[720px]',
        },
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      const newPromotion = {
        ...formData,
        id: 100,
        startDate: formData.startDate.format('DD/MM/YYYY'),
        endDate: formData.endDate.format('DD/MM/YYYY'),
      };
      dispatch(addPromotion(newPromotion));
      MySwal.fire({
        html: <Success message="This promotion was successfully added" />,
        customClass: {
          popup: 'rounded-3xl w-auto md:w-[720px]',
        },
        showConfirmButton: false,
        timer: 1000,
      });
    }
    navigate(-1);
  };

  const isDetailPage = page === 'detail';

  return (
    <form
      className="w-full mt-7 bg-[#FFFFFF] px-6 py-4 rounded-3xl"
      onSubmit={handleSubmit}
    >
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
        <div className="promotion-form grid grid-cols-1 md:grid-cols-2 w-full gap-6">
          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="promotionType">
              Promotion Type
            </label>
            <div className="relative w-full">
              <ArrowDownGray className="absolute right-4 top-1/2 -translate-y-1/2" />
              <select
                className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none appearance-none w-full"
                disabled={isDetailPage}
                id="promotionType"
                name="promotionType"
                value={formData.promotionType}
                onChange={handleChange}
              >
                <option disabled value="">
                  Select Promotion Type
                </option>
                <option value="direct-discount">Direct Discount</option>
                <option value="voucher-code">Voucher Code</option>
              </select>
            </div>
          </div>

          {formData.promotionType === 'voucher-code' && (
            <div className="flex flex-col gap-5 w-full">
              <label className="text-[14.22px]" htmlFor="voucherCode">
                Voucher Code
              </label>
              <input
                className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
                disabled={isDetailPage}
                id="voucherCode"
                name="voucherCode"
                placeholder="Enter Voucher Code"
                type="text"
                value={formData.voucherCode}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="promotionName">
              Promotion Name
            </label>
            <input
              className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              disabled={isDetailPage}
              id="promotionName"
              name="promotionName"
              placeholder="Enter Promotion Name"
              type="text"
              value={formData.promotionName}
              onChange={handleChange}
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
                disabled={isDetailPage}
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
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
            <label className="text-[14.22px]" htmlFor="startDate">
              Start Date
            </label>
            <DatePicker
              className="bg-surface-background hover:border-surface-border active-border-surface-border focus-border-surface-border focus:ring-0 text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              disabled={isDetailPage}
              id="startDate"
              name="startDate"
              placeholder="Select Start Date"
              style={{
                border: '1px solid #DBDCDE',
                outline: 'none',
                boxShadow: 'none',
                background: '#F4F5F9',
              }}
              suffixIcon={<Date />}
              type="date"
              value={formData.startDate}
              onChange={(value) => handleChange(value, 'startDate')}
            />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="endDate">
              End Date
            </label>
            <DatePicker
              className="bg-surface-background hover:border-surface-border active-border-surface-border focus-border-surface-border focus:ring-0 text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              disabled={isDetailPage}
              id="endDate"
              name="endDate"
              placeholder="Select End Date"
              style={{
                border: '1px solid #DBDCDE',
                outline: 'none',
                boxShadow: 'none',
                background: '#F4F5F9',
              }}
              suffixIcon={<Date />}
              type="date"
              value={formData.endDate}
              onChange={(value) => handleChange(value, 'endDate')}
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
                disabled={isDetailPage}
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
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
            <label className="text-[14.22px]" htmlFor="promotionLimit">
              Promotion Usage Limit
            </label>
            <input
              className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              disabled={isDetailPage}
              id="promotionLimit"
              name="promotionLimit"
              placeholder="Promotion Usage Limit"
              type="text"
              value={formData.promotionLimit}
              onChange={handleChange}
            />
          </div>

          {formData.promotionType === 'voucher-code' && (
            <div className="flex flex-col justify-center gap-5 w-full col-span-2">
              <label className="flex items-center gap-3 text-base text-[#101010]">
                <input
                  checked={formData.showVoucherCode}
                  className="w-5 h-5 border-none outline-none ring-none appearance-none checked:appearance-auto rounded border-surface-border bg-[#E6E6E6] focus:ring-0"
                  disabled={isDetailPage}
                  id="show-voucher-checkbox"
                  name="showVoucherCode"
                  type="checkbox"
                  onChange={handleChange}
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
            className={`flex justify-center items-center rounded-lg w-[100px] text-[12.64px] h-8 border ${isDetailPage ? 'bg-type-text-light text-white' : 'border-primary text-primary hover:bg-primary hover:text-white transition-colors'}`}
            to="/dashboard/promotions"
          >
            {isDetailPage ? 'Close' : 'Cancel'}
          </Link>
          {!isDetailPage && (
            <button
              className="rounded-lg w-[100px] h-8 bg-primary text-[12.64px] text-white hover:bg-primary-dark transition-colors"
              type="submit"
            >
              {id ? 'Save' : 'Add Promotion'}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PromotionForm;
