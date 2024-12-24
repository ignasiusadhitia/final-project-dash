import React from 'react';

import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { Card, Success } from '@components';
import { ArrowLeft, ArrowRightSmall } from '@icons';

const FormStock = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/');
  const page = location[location.length - 2];
  const { id } = useParams();

  // Dummy data
  const products = [
    'Laptop HP',
    'Laptop Lenovo',
    'Laptop Logitech',
    'Laptop Razetr',
  ];

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      MySwal.fire({
        html: <Success message="This category was successfully edited" />,
        customClass: {
          popup: 'rounded-md w-auto md:w-[720px]',
        },
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      MySwal.fire({
        html: <Success message="This category was successfully added" />,
        customClass: {
          popup: 'rounded-md w-auto md:w-[720px]',
        },
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <div className="w-full px-5 pt-12">
      <Card className="rounded-2xl p-5 h-auto overflow-hidden">
        <header>
          {/* TITLE */}
          <div className="flex items-center gap-5">
            <ArrowLeft
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-lg font-medium">
              {page === 'detail' ? 'Detail' : id ? 'Edit' : 'Add'} Stock
            </h1>
          </div>
          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 mt-2 pb-5">
            <Link className="text-primary text-xs font-normal" to="/dashboard">
              Home
            </Link>
            <ArrowRightSmall />
            <Link
              className="text-primary text-xs font-normal"
              to="/dashboard/stocks"
            >
              Stocks
            </Link>
            <ArrowRightSmall />
            <p className="text-primary text-xs font-normal">
              {page === 'detail'
                ? 'Detail Stock'
                : id
                  ? 'Edit Stock'
                  : 'Add Stock'}
            </p>
          </div>
        </header>
        <main className="p-5">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-5 w-full">
                <label className="text-[14.22px]" htmlFor="productName">
                  Product
                </label>
                <select
                  className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
                  id="productName"
                  name="productName"
                >
                  <option value="">Select Product</option>
                  {products.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-5 w-full">
                <label className="text-[14.22px]" htmlFor="currentStock">
                  Current Stock
                </label>
                <input
                  className="bg-surface-background placeholder:text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
                  disabled={page === 'detail'}
                  id="currentStock"
                  inputMode="number"
                  placeholder="Current Stock"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-5 w-full">
                <label className="text-[14.22px]" htmlFor="newStock">
                  New Stock
                </label>
                <input
                  className="bg-surface-background placeholder:text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
                  disabled={page === 'detail'}
                  id="newStock"
                  inputMode="number"
                  placeholder="Enter New Stock"
                  type="text"
                />
              </div>
            </div>
            <div className="mt-10 flex justify-end gap-2">
              <button
                className={`flex justify-center items-center rounded-lg w-[100px] text-[12.64px] h-8 border ${page == 'detail' ? 'bg-type-text-light text-white' : 'border-primary text-primary'}`}
                type="button"
                onClick={() => navigate(-1)}
              >
                Close
              </button>
              <button
                className={`flex justify-center items-center rounded-lg w-[100px] text-[12.64px] h-8 bg-primary text-white ${page == 'detail' && 'hidden'}`}
                type="submit"
              >
                {id ? 'Save' : 'Add Stock'}
              </button>
            </div>
          </form>
        </main>
      </Card>
    </div>
  );
};

export default FormStock;
