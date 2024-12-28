import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  ArrowRightSmall,
  Eyes,
  ArrowSorting,
  AcceptOrder,
  CancelOrder,
} from '@icons';

import StatusPill from './StatusPill';

const OrderList = ({
  orders,
  onShowConfirmationHandler,
  onShowOrderDetailsHandler,
  onDownloadHandler,
}) => {
  const [data, setData] = useState(orders);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending',
  }); // New state for sorting
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

  useEffect(() => {
    setData(orders);
  }, [orders]);

  return (
    <div className="w-full mt-7 bg-[#FFFFFF] px-6 py-4 rounded-3xl">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-[25.63px] font-bold">Orders</h1>
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
              to={'/dashboard/orders'}
            >
              Orders
            </Link>
          </div>
        </div>

        <div>
          <button
            className="flex justify-center items-center text-[12.64px] rounded border-[1px] border-primary text-primary px-[13.5px] py-2"
            onClick={onDownloadHandler}
          >
            Download all
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('username')}
                >
                  User Name
                  <ArrowSorting />
                </button>
              </th>
              <th className="flex items-center gap-2 text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('address')}
                >
                  Address
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('payment_method')}
                >
                  Payment Method
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('amount')}
                >
                  Amount
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">
                <button
                  className="flex items-center gap-2"
                  onClick={() => sortData('status_order')}
                >
                  Status Order
                  <ArrowSorting />
                </button>
              </th>
              <th className="text-sm text-start font-bold px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {currentData.map((item) => (
              <tr key={item.id}>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light capitalize">
                  {item.username}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.address}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  {item.payment_method}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light">
                  ${item.amount}
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light capitalize">
                  <StatusPill status={item.status_order} />
                </td>
                <td className="text-xs font-medium px-4 py-3 border-b-2 text-type-text-light text-center">
                  <div className="flex gap-3 lg:gap-5 items-center">
                    {item.status_order === 'completed' ||
                    item.status_order === 'canceled' ? (
                      <button
                        onClick={() => onShowOrderDetailsHandler(item.id)}
                      >
                        <Eyes />
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => onShowOrderDetailsHandler(item.id)}
                        >
                          <AcceptOrder />
                        </button>
                        <button onClick={() => onShowConfirmationHandler(item)}>
                          <CancelOrder />
                        </button>
                      </>
                    )}
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

OrderList.propTypes = {
  orders: PropTypes.array,
  onShowConfirmationHandler: PropTypes.func,
  onShowOrderDetailsHandler: PropTypes.func,
  onDownloadHandler: PropTypes.func,
};

export default OrderList;
