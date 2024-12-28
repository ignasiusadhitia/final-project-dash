import React, { useState } from 'react';

import { Link } from 'react-router-dom';
// SWAL
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { Confirm, Success } from '@components';
import {
  ArrowDown,
  ArrowRightSmall,
  Eyes,
  Pen,
  Trash,
  ArrowSorting,
} from '@icons';

const dummyData = [
  {
    id: 1,
    promotionName: 'Promo Akhir Tahun',
    startDate: '02/11/2024',
    endDate: '11/11/2024',
    promotionType: 'Direct Discount',
    description: 'Potongan 20% dengan pembelian di atas 100rb',
    status: 'Active',
    published: true,
  },
  {
    id: 2,
    promotionName: 'Cuci Gudang',
    startDate: '01/11/2024',
    endDate: '10/11/2024',
    promotionType: 'Voucher Code',
    description: 'Potongan 30% dengan pembelian di atas 100rb',
    status: 'Active',
    published: false,
  },
  {
    id: 3,
    promotionName: 'Spesial Kemerdekaan',
    startDate: '29/10/2024',
    endDate: '09/11/2024',
    promotionType: 'Direct Discount',
    description: 'Potongan 10% dengan pembelian di atas 100rb',
    status: 'Inactive',
    published: false,
  },
  {
    id: 4,
    promotionName: 'Hari Kartini',
    startDate: '21/10/2024',
    endDate: '30/10/2024',
    promotionType: 'Direct Discount',
    description: 'Potongan 15% dengan pembelian di atas 100rb',
    status: 'Inactive',
    published: false,
  },
  {
    id: 5,
    promotionName: 'Flash Sale Akhir Tahun',
    startDate: '15/12/2024',
    endDate: '31/12/2024',
    promotionType: 'Flash Sale',
    description: 'Potongan hingga 50% untuk semua produk',
    status: 'Active',
    published: true,
  },
  {
    id: 6,
    promotionName: 'Bonus Akhir Pekan',
    startDate: '08/12/2024',
    endDate: '10/12/2024',
    promotionType: 'Bonus Reward',
    description: 'Dapatkan bonus poin hingga 200 untuk pembelian minimal 100rb',
    status: 'Active',
    published: false,
  },
];

const PromotionList = () => {
  const [data, setData] = useState(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending',
  });
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  // HANDLE PUBLISH LOGIC
  const handleTogglePublished = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, published: !item.published } : item
    );
    // Get the current data
    let currentData = data.filter((item) => item.id === id);
    setData(updatedData);

    // TODO: Add condition (success publis/ unpublish from API) before calling alert code below
    MySwal.fire({
      html: (
        <Success
          message={`Successfuly ${currentData[0].published ? 'Unpublish' : 'Publish'} Promotion with id = ${id}`} // TODO: change this message
        />
      ),
      customClass: {
        popup: 'rounded-3xl w-auto md:w-[720px]',
      },
      showConfirmButton: false,
      timer: 1000,
    });
  };
  const handlePublishModal = (data) => {
    if (data.published) {
      MySwal.fire({
        html: (
          <Confirm
            action={() => handleTogglePublished(data.id)}
            desc="Are you sure want to unpublish this promotion?"
            publish={true}
          />
        ),
        customClass: {
          popup: 'rounded-3xl py-10',
        },
        showConfirmButton: false,
      });
    } else {
      handleTogglePublished(data.id);
    }
  };
  // HANDLE DELETE LOGIC
  const handleDeletePromotion = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    MySwal.fire({
      html: <Success message="This promotion was successfully deleted" />,
      customClass: {
        popup: 'rounded-3xl w-auto md:w-[720px]',
      },
      showConfirmButton: false,
      timer: 1000,
    });
  };
  const handleDeleteModal = (data) => {
    MySwal.fire({
      html: (
        <Confirm
          action={() => handleDeletePromotion(data.id)}
          desc="Are you sure want to delete this promotion?"
        />
      ),
      customClass: {
        popup: 'rounded-3xl py-10',
      },
      showConfirmButton: false,
    });
  };

  const handleChangePage = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowChange = (event) => {
    setRowsPerPage(Number(event.target.value));
  };

  return (
    <div className="w-full mt-7 bg-[#FFFFFF] px-6 py-4 rounded-3xl">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-[25.63px] font-bold">Promotion</h1>
          <div className="flex items-center gap-2 mt-2 pb-3">
            <Link
              className="text-primary text-xs font-normal"
              to={'/dashboard'}
            >
              Home
            </Link>
            <ArrowRightSmall />
            <Link
              className="text-primary text-xs font-normal"
              to={'/dashboard/promotions'}
            >
              Promotion
            </Link>
          </div>
        </div>

        <div>
          <Link
            className="flex justify-center items-center text-[12.64px] rounded-md text-white px-2 bg-primary w-[132px] h-[32px]"
            to={'/dashboard/promotions/add'}
          >
            Add New Promotion
          </Link>
        </div>
      </div>

      <div className="my-4 flex">
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
      </div>

      <div className="overflow-x-auto">
        <table className="md:table-auto lg:table-fixed w-full border-collapse">
          <thead>
            <tr>
              <th className="flex items-center gap-2 text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('promotionName')}
                >
                  Promotion Name
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('startDate')}
                >
                  Start Date
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('endDate')}
                >
                  End Date
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('promotionType')}
                >
                  Promotion Type
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('description')}
                >
                  Description
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('status')}
                >
                  Status
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('published')}
                >
                  Published
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {currentData.map((item) => (
              <tr key={item.id}>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.promotionName}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.startDate}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.endDate}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.promotionType}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.description}
                </td>
                <td className="border-b-2 text-white">
                  <span
                    className={`text-sm px-4 py-2 rounded-full font-medium ${item.status === 'Active' ? 'bg-[#198754]' : 'bg-[#6C757D]'}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light text-start">
                  <button
                    className={`p-[2px] w-10 h-[22px] rounded-full  transition-all ${
                      item.published ? 'bg-primary' : 'bg-[#D2D2D2]'
                    }`}
                    onClick={() => handlePublishModal(item)}
                  >
                    <div
                      className={` h-[18px] w-[18px] rounded-full bg-white transition-all ${
                        item.published && 'translate-x-full'
                      }`}
                    ></div>
                  </button>
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light text-center">
                  <div className="flex gap-3 lg:gap-5 items-center">
                    <Link to={`/dashboard/promotions/detail/${item.id}`}>
                      <Eyes />
                    </Link>
                    <Link to={`/dashboard/promotions/edit/${item.id}`}>
                      <Pen />
                    </Link>
                    <button onClick={() => handleDeleteModal(item)}>
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between mt-4 py-4">
        <p className="text-sm text-type-text-light font-medium">
          {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
            currentPage * rowsPerPage,
            data.length
          )} of ${data.length}`}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <p className="text-sm font-medium text-type-text-light">
              Rows per page:
            </p>
            <select
              className="text-type-text-light px-1"
              id="row-page"
              name="row-page"
              value={rowsPerPage}
              onChange={handleRowChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button
            className="p-1 px-2 rounded-lg border"
            disabled={currentPage === 1}
            onClick={() => handleChangePage('prev')}
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
            onClick={() => handleChangePage('next')}
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
  );
};

export default PromotionList;
