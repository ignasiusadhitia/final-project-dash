import React, { useState, useEffect, useRef } from 'react';

import { DatePicker } from 'antd';
import { Link } from 'react-router-dom';

import {
  ArrowDown,
  ArrowRightSmall,
  ArrowSorting,
  Calendar,
  ArrowRightWhite,
  Search,
} from '@icons';

const dummyData = [
  {
    id: 1,
    username: 'user1',
    url: 'https://picsum.photos/150',
    rating: '4/5',
    reviewDate: '09/11/2024',
    review:
      'Saya sangat puas dengan produk ini. Kualitasnya sesuai dengan deskripsi dan pengirimannya juga cepat. Selain itu, penjual sangat responsif dalam menjawab pertanyaan saya terkait detail produk. Akan kembali membeli di toko ini untuk kebutuhan lainnya.',
  },
  {
    id: 2,
    username: 'user2',
    url: 'https://picsum.photos/150',
    rating: '3/5',
    reviewDate: '08/11/2024',
    review:
      'Barang yang diterima cukup baik, tetapi kemasan sedikit rusak saat sampai. Pengiriman juga memakan waktu lebih lama dari yang diharapkan. Namun, secara keseluruhan produk ini masih layak dipakai dan sesuai dengan harganya.',
  },
  {
    id: 3,
    username: 'user3',
    url: 'https://picsum.photos/150',
    rating: '5/5',
    reviewDate: '07/11/2024',
    review:
      'Luar biasa! Produk ini benar-benar melebihi ekspektasi saya. Kualitas materialnya sangat premium dan detail finishingnya sempurna. Saya sangat merekomendasikan produk ini untuk siapa saja yang mencari kualitas terbaik dengan harga yang cukup terjangkau.',
  },
  {
    id: 4,
    username: 'user4',
    url: 'https://picsum.photos/150',
    rating: '2/5',
    reviewDate: '06/11/2024',
    review:
      'Saya cukup kecewa dengan produk ini. Barang yang dikirim tidak sesuai dengan deskripsi di situs, dan ukurannya juga tidak pas. Pengembalian dana memakan waktu lama, sehingga pengalaman belanja saya jadi kurang menyenangkan.',
  },
  {
    id: 5,
    username: 'user5',
    url: 'https://picsum.photos/150',
    rating: '1/5',
    reviewDate: '05/11/2024',
    review:
      'Ini adalah pengalaman terburuk saya dalam berbelanja online. Barang yang diterima cacat parah dan tidak bisa digunakan sama sekali. Penjual tidak merespons ketika saya meminta solusi. Sangat mengecewakan dan tidak akan pernah belanja di sini lagi.',
  },
  {
    id: 6,
    username: 'user6',
    url: 'https://picsum.photos/150',
    rating: '4/5',
    reviewDate: '04/11/2024',
    review:
      'Secara keseluruhan, saya puas dengan produk ini. Harga yang ditawarkan sangat kompetitif dibandingkan toko lain, dan kualitas barangnya sesuai dengan deskripsi. Hanya saja, pengiriman sedikit terlambat dari yang dijanjikan.',
  },
  {
    id: 7,
    username: 'user7',
    url: 'https://picsum.photos/150',
    rating: '3/5',
    reviewDate: '03/11/2024',
    review:
      'Barangnya oke, tetapi ada beberapa detail kecil yang membuatnya kurang sempurna. Selain itu, proses pengemasan kurang rapi sehingga ada goresan kecil pada produk. Semoga ke depannya bisa lebih diperbaiki.',
  },
  {
    id: 8,
    username: 'user8',
    url: 'https://picsum.photos/150',
    rating: '5/5',
    reviewDate: '02/11/2024',
    review:
      'Produk ini benar-benar luar biasa! Desainnya sangat modern dan sesuai dengan selera saya. Selain itu, pengemasan sangat rapi dan aman, sehingga barang sampai tanpa cacat. Penjual juga memberikan layanan terbaik yang pernah saya alami.',
  },
];

const RatingList = () => {
  const [data, setData] = useState(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending',
  });
  const [showItemId, setShowItemId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [date, setDate] = useState('');
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

  const handleShowMoreReview = (itemId) => {
    setShowItemId(showItemId === itemId ? 0 : itemId);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    const filteredData = dummyData.filter(
      (item) =>
        item.username.toLowerCase().includes(value) ||
        item.rating.toString().toLowerCase().includes(value) ||
        item.review.toLowerCase().includes(value)
    );

    setData(filteredData);
  };

  // DATEPICKER
  const [showPickDate, setShowPickDate] = useState(false);
  const dateRef = useRef(null);
  const togglePickDate = () => {
    setShowPickDate(!showPickDate);
  };
  const handleClickOutside = (event) => {
    if (dateRef.current && !dateRef.current.contains(event.target)) {
      setShowPickDate(false);
    }
  };
  useEffect(() => {
    if (showPickDate) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPickDate]);
  // END DATEPICKER

  const handleFilterByDate = (e) => {
    setShowPickDate(false);
    if (!e) {
      setData(dummyData);
      return;
    }

    const date = new Date(e);

    const shortDate = date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    setDate(e);

    const filteredData =
      dummyData.filter((item) =>
        item.reviewDate.toLowerCase().includes(shortDate)
      ) || dummyData;

    setData(filteredData);
  };

  return (
    <div className="w-full mt-7 bg-[#FFFFFF] px-6 py-4 rounded-3xl">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-[25.63px] font-bold">Rating</h1>
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
              to={'/dashboard/ratings'}
            >
              Rating
            </Link>
          </div>
        </div>
      </div>

      <div className="my-4 flex flex-wrap lg:flex-row items-start lg:items-center gap-5">
        <div className="w-full md:w-auto flex gap-5 items-center">
          <div
            ref={dateRef}
            className={`flex-shrink-0 relative ${!showPickDate && 'overflow-hidden'}`}
          >
            <div
              className="w-full cursor-pointer bg-white hover:border-surface-border text-type-text-light border rounded-lg border-surface-border px-4 py-2 hover:bg-black/5"
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
              value={date}
              onChange={handleFilterByDate}
            />
          </div>

          <div className="relative w-full md:w-auto">
            <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
            <select
              className="w-full md:w-[250px] h-[40px] border text-sm font-medium text-type-text-light rounded-md focus:outline-none px-3 appearance-none"
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

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className="bg-white w-full md:w-[250px] placeholder:text-[#A1A9B8] border rounded-lg border-surface-border px-9 py-2 text-[14.22px] outline-none"
            id="search"
            name="search"
            placeholder="Search"
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto lg:table-fixed w-full border-collapse">
          <thead>
            <tr>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('url')}
                >
                  Profile Picture
                  <ArrowSorting />
                </button>
              </th>
              <th className="flex items-center gap-2 text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('username')}
                >
                  User Name
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('rating')}
                >
                  Rating
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('reviewDate')}
                >
                  Review Date
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('review')}
                >
                  Review
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
                    src={item.url}
                  />
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.username}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.rating}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.reviewDate}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  <p
                    className={`${item.id !== showItemId && 'line-clamp-2'}`}
                    style={{ textOverflow: 'clip' }}
                  >
                    {item.review}
                  </p>
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light text-center">
                  <div className="flex justify-start">
                    <button
                      className={`w-7 h-7 rounded-lg bg-black flex justify-center items-center transition ease-in duration-300 ${item.id === showItemId && 'rotate-90'}`}
                      onClick={() => handleShowMoreReview(item.id)}
                    >
                      <ArrowRightWhite />
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

export default RatingList;
