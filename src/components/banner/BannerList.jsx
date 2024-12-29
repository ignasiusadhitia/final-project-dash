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
    name: 'Promo Akhir Tahun',
    url: 'www.e-commerce.com',
    release: '09/11/2024',
    end: '12/11/2024',
    published: true,
  },
  {
    id: 2,
    name: 'Produk Baru',
    url: 'www.e-commerce.com',
    release: '08/11/2024',
    end: '11/11/2024',
    published: false,
  },
  {
    id: 3,
    name: 'Diskon 30%',
    url: 'www.e-commerce.com',
    release: '07/11/2024',
    end: '10/11/2024',
    published: true,
  },
  {
    id: 4,
    name: 'Giveaway',
    url: 'www.e-commerce.com',
    release: '03/11/2024',
    end: '09/11/2024',
    published: false,
  },
  {
    id: 5,
    name: 'Event Akhir Tahun',
    url: 'www.e-commerce.com',
    release: '02/11/2024',
    end: '08/11/2024',
    published: true,
  },
  {
    id: 6,
    name: 'Flash Sale',
    url: 'www.e-commerce.com',
    release: '01/11/2024',
    end: '07/11/2024',
    published: false,
  },
  {
    id: 7,
    name: 'Promo Spesial',
    url: 'www.e-commerce.com',
    release: '31/10/2024',
    end: '06/11/2024',
    published: true,
  },
  {
    id: 8,
    name: 'Bonus Member',
    url: 'www.e-commerce.com',
    release: '30/10/2024',
    end: '05/11/2024',
    published: false,
  },
  {
    id: 9,
    name: 'Kupon Belanja',
    url: 'www.e-commerce.com',
    release: '29/10/2024',
    end: '04/11/2024',
    published: true,
  },
  {
    id: 10,
    name: 'Promo Gratis Ongkir',
    url: 'www.e-commerce.com',
    release: '28/10/2024',
    end: '03/11/2024',
    published: false,
  },
];

const BannerList = () => {
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
    if (currentData[0].published) {
      MySwal.fire({
        html: <Success message="This banner was successfully unpublished" />,
        customClass: {
          popup: 'rounded-3xl w-auto md:w-[720px]',
        },
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      MySwal.fire({
        html: <Success message="This banner was successfully published" />,
        customClass: {
          popup: 'rounded-3xl w-auto md:w-[720px]',
        },
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  const handlePublishModal = (data) => {
    if (data.published) {
      MySwal.fire({
        html: (
          <Confirm
            action={() => handleTogglePublished(data.id)}
            desc="Are you sure want to unpublish this banner?"
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
      html: <Success message="This banner was successfully deleted" />,
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
          desc="Are you sure want to delete this banner?"
          publish={false}
          title="Delete Banner?"
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
          <h1 className="text-[25.63px] font-bold">Banner Management</h1>
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
              to={'/dashboard/banners'}
            >
              Banner Management
            </Link>
          </div>
        </div>

        <div>
          <Link
            className="flex justify-center items-center text-[12.64px] rounded-md text-white px-2 bg-primary hover:bg-primary-dark transition-colors w-[123px] h-[32px]"
            to={'/dashboard/banners/add'}
          >
            Add New Banner
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
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('name')}
                >
                  Banner Picture
                  <ArrowSorting />
                </button>
              </th>
              <th className="flex items-center gap-2 text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('name')}
                >
                  Banner Name
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('url')}
                >
                  Target URL
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('release')}
                >
                  Release Date
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('end')}
                >
                  End Date
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
                <td className="px-4 py-3 border-b-2 text-type-text-light">
                  <img
                    alt="Banner"
                    className="w-[50px] h-[37px] rounded"
                    src="https://picsum.photos/150"
                  />
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.name}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.url}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.release}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.end}
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
                    <Link to={'/dashboard/banners/detail/1'}>
                      <Eyes />
                    </Link>
                    <Link to={'/dashboard/banners/edit/1'}>
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

export default BannerList;
