import React, { useState, useEffect } from 'react';

import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { Card, Success } from '@components';
import { ArrowDownGray, ArrowLeft, ArrowRightSmall } from '@icons';

const FormStock = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/');
  const page = location[location.length - 2];
  const { id } = useParams();

  // Dummy data (get data from API))
  const dummyData = [
    {
      id: 1,
      productName: 'Laptop HP',
      newStock: '',
      currentStock: 5,
    },
    {
      id: 2,
      productName: 'Laptop Lenovo',
      newStock: '',
      currentStock: 20,
    },
    {
      id: 3,
      productName: 'Laptop Logitech',
      newStock: '',
      currentStock: 10,
    },
    {
      id: 4,
      productName: 'Laptop Razer',
      newStock: '',
      currentStock: 5,
    },
  ];
  // const [data, setData] = useState(dummyData);
  const [formData, setFormData] = useState({
    productName: '',
    newStock: '',
    currentStock: '',
  });
  const products = dummyData.map((item) => item.productName);
  const selectedProducts = dummyData.find((item) => item.id === Number(id));
  useEffect(() => {
    if (id) {
      setFormData(selectedProducts);
    }
  }, [id]);
  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      navigate(-1);
      MySwal.fire({
        html: <Success message="This stock was successfully updated" />,
        customClass: {
          popup: 'rounded-3xl w-auto md:w-[720px]',
        },
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      navigate(-1);
      MySwal.fire({
        html: <Success message="This stock was successfully added" />,
        customClass: {
          popup: 'rounded-3xl w-auto md:w-[720px]',
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
        <main className="p-5 border-t border-surface-border">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-5 w-full">
                <label className="text-[14.22px]" htmlFor="productName">
                  Product
                </label>
                <div className="relative w-full">
                  <ArrowDownGray className="absolute right-4 top-1/2 -translate-y-1/2" />
                  <select
                    className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] appearance-none outline-none w-full"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                  >
                    <option value="">Select Product</option>
                    {products.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
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
                  value={formData.currentStock}
                  onChange={handleChange}
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
                className={`flex justify-center items-center rounded-lg w-[100px] text-[12.64px] h-8 border ${page == 'detail' ? 'bg-type-text-light text-white' : 'border-primary text-primary hover:bg-primary hover:text-white transition-colors'}`}
                type="button"
                onClick={() => navigate(-1)}
              >
                Close
              </button>
              <button
                className={`flex justify-center items-center rounded-lg w-[100px] text-[12.64px] h-8 bg-primary text-white hover:bg-primary-dark ${page == 'detail' && 'hidden'}`}
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
