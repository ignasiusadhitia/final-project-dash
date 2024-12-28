import React, { useState } from 'react';

import { DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { Table, Card, Success, Confirm } from '@components';
import {
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
  const dummyData = [
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
  const tableHeader = ['Product Name', 'Varian Product', 'Quantity', 'Action'];
  const [tableData, setTableData] = useState(dummyData);
  const dataKey = ['productName', 'variant', 'quantity'];
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending',
  });
  // Handle row change
  const handleRowChange = (event) => {
    setRowsPerPage(Number(event.target.value));
  };
  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setTableData(sortedData);
    setSortConfig({ key, direction });
  };
  const sort = [
    () => sortData('productName'),
    () => sortData('variant'),
    () => sortData('quantity'),
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
      customClass: {
        popup: 'rounded-3xl p-32',
      },
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

  const [showPickDate, setShowPickDate] = useState(false);
  const togglePickDate = () => {
    setShowPickDate(!showPickDate);
  };

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
        <div className="grid gap-5 md:flex justify-between">
          <div className="flex flex-wrap lg:flex-row items-start lg:items-center gap-5">
            {/* DATE PICKER */}
            <div
              className={`flex-shrink-0 relative ${!showPickDate && 'overflow-hidden'}`}
            >
              <div
                className="w-full cursor-pointer bg-white hover:border-surface-border active-border-surface-border focus-border-surface-border focus:ring-0 text-type-text-light border rounded-lg border-surface-border px-4 py-2 text-[14.22px] outline-none hover:bg-black/5"
                onClick={togglePickDate}
              >
                <Calendar />
              </div>
              <DatePicker
                className={`${!showPickDate && 'opacity-0'} w-60 transition-all absolute -bottom-12 bg-white hover:border-surface-border active-border-surface-border focus-border-surface-border focus:ring-0 text-type-text-light border rounded-lg border-surface-border px-4 py-2 text-[14.22px] outline-none z-10`}
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
                onChange={togglePickDate}
              />
            </div>
            {/* SELECT FILTER */}
            <div className="relative flex-grow">
              <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
              <select
                className="min-w-[250px] w-full h-[40px] border text-sm font-medium text-type-text-light rounded-md focus:outline-none px-3 appearance-none"
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
            {/* SEARCH */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                className="bg-white w-full md:w-[250px] placeholder:text-[#A1A9B8] border rounded-lg border-surface-border px-9 py-2 text-[14.22px] outline-none"
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
            dataKey={dataKey}
            sort={sort}
            tableData={tableData}
            tableHeader={tableHeader}
          />
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col items-center md:flex-row md:justify-between text-black/50 font-bold mt-5 text-sm px-5">
          <p className="text-sm text-type-text-light font-medium">
            {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
              currentPage * rowsPerPage,
              tableData.length
            )} of ${tableData.length}`}
          </p>
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="rows">Rows per page:</label>
              <select
                id="rows"
                name="rows"
                value={rowsPerPage}
                onChange={handleRowChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="p-1 px-2 rounded-lg border"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <svg
                  fill="none"
                  height="17"
                  viewBox="0 0 16 17"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 11.5938L6.5 8.59375L9.5 5.59375"
                    stroke={currentPage === 1 ? '#A1A9B8' : '#464F60'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <p className="font-medium text-sm">
                <span className="text-[#171C26]">{currentPage}</span>/
                <span className="text-[#687182]">{totalPages}</span>
              </p>
              <button
                className="p-1 px-2 rounded-lg border"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <svg
                  fill="none"
                  height="17"
                  viewBox="0 0 16 17"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 11.5938L9.5 8.59375L6.5 5.59375"
                    stroke={currentPage === totalPages ? '#A1A9B8' : '#464F60'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Stock;
