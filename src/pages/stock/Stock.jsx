import React from 'react';

import { DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { Table, Card, Success, Confirm } from '@components';
import {
  Chevron,
  Pencil,
  Trash,
  Eyes,
  ArrowRightSmall,
  Calendar,
  ArrowDown,
  Search,
} from '@icons';

const Stock = () => {
  const navigate = useNavigate();

  // TABLE PROPS
  const tableHeader = ['Product Name', 'Varian Product', 'Quantity', 'Action'];
  const tableData = [
    {
      id: 1,
      productName: 'Laptop HP',
      variant: 'Warna: Hitam',
      quantity: 5,
    },
    {
      id: 2,
      productName: 'Laptop Lenovo',
      variant: 'Warna: Silver',
      quantity: 20,
    },
    {
      id: 3,
      productName: 'Laptop Logitech',
      variant: 'Warna: Merah',
      quantity: 10,
    },
    {
      id: 4,
      productName: 'Laptop Razer',
      variant: 'Warna: Hijau',
      quantity: 5,
    },
  ];
  const sort = [
    {
      asc: () => alert('sort asc by name'),
      desc: () => alert('sort desc by name'),
    },
    {
      asc: () => alert('sort asc by varian'),
      desc: () => alert('sort desc by varian'),
    },
    {
      asc: () => alert('sort asc by quantity'),
      desc: () => alert('sort desc by quantity'),
    },
  ];

  const handleDelete = (data) => {
    MySwal.fire({
      html: (
        <Success message={`Data with id:${data.id} successfully deleted`} />
      ),
      customClass: {
        popup: 'rounded-md w-auto md:w-[720px]',
      },
      showConfirmButton: false,
      timer: 1000,
    });
  };
  const handleConfirmDelete = (data = []) => {
    MySwal.fire({
      html: (
        <Confirm
          action={() => handleDelete(data)}
          desc="Are you sure want to delete this stock?"
          publish={false}
          title="Delete Stock?"
        />
      ),
      showConfirmButton: false,
    });
  };

  const actions = [
    {
      icon: Eyes,
      action: (data) => navigate(`/dashboard/stocks/detail/${data.id}`),
    },
    {
      icon: Pencil,
      action: (data) => navigate(`/dashboard/stocks/edit/${data.id}`),
    },
    {
      icon: Trash,
      action: (data) => handleConfirmDelete(data),
    },
  ];

  return (
    <div className="w-full px-5 pt-12 overflow-hidden">
      <Card className="rounded-3xl h-auto">
        {/* HEADER */}
        <div className="flex justify-between mb-7 items-baseline">
          <header className="space-y-2">
            {/* Title */}
            <h1 className="text-[25.63px] font-bold">Stock</h1>
            {/* Breadcrumb */}
            <p className="flex gap-2 items-center">
              <span
                className="text-primary cursor-pointer text-xs"
                onClick={() => navigate('/dashboard')}
              >
                Home
              </span>
              <ArrowRightSmall />
              <span className="text-primary text-xs">Stock</span>
            </p>
          </header>
          <button
            className="flex justify-center items-center text-[12.64px] rounded-md text-white px-2 bg-primary w-[123px] h-[32px]"
            onClick={() => navigate('/dashboard/stocks/add')}
          >
            Add New Stock
          </button>
        </div>

        {/* FILTER AND SEARCH */}
        <div className="gap-5 md:flex justify-between items-center">
          <div className="grid md:flex flex-wrap gap-5">
            <div>
              <DatePicker
                className="bg-white hover:border-surface-border active-border-surface-border focus-border-surface-border focus:ring-0 text-type-text-light border rounded-lg border-surface-border px-4 py-2 text-[14.22px] outline-none"
                id="release-date"
                style={{
                  border: '1px solid #DBDCDE',
                  outline: 'none',
                  boxShadow: 'none',
                  background: 'white',
                }}
                suffixIcon={<Calendar />}
                type="date"
                // value={date}
                // onChange={handleFilterByDate}
              />
            </div>
            <div className="relative">
              <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
              <select
                className="w-[250px] h-[40px] border text-sm font-medium text-type-text-light rounded-md focus:outline-none px-3 appearance-none"
                defaultValue=""
                id="filter"
                name="filter"
              >
                <option disabled value="">
                  Select Filter
                </option>
                <option value="name">Name</option>
                <option value="release">Release</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                className="bg-white w-[250px] placeholder:text-[#A1A9B8] border rounded-lg border-surface-border px-9 py-2 text-[14.22px] outline-none"
                id="search"
                name="search"
                placeholder="Search"
                type="text"
                // value={searchValue}
                // onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="bg-[#EEE4FF] text-primary text-right rounded-md w-[93px] h-[44px] leading-none py-1 px-3 text-nowrap">
            <p className="text-[21.8px] font-bold">120</p>
            <p className="text-[14.4px]">Total Stock</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <Table
            actions={actions}
            sort={sort}
            tableData={tableData}
            tableHeader={tableHeader}
          />
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col items-center md:flex-row md:justify-between text-black/50 font-bold mt-5 text-sm px-5">
          <p>1-20 of 27</p>
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="rows">Rows per page:</label>
              <select id="rows" name="rows">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button>
                <Chevron className="rotate-180 border h-5 w-5 rounded-sm" />
              </button>
              <p>1/2</p>
              <button>
                <Chevron className="border h-5 w-5 rounded-sm" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Stock;
