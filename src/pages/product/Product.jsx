import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
// SWAL
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { Confirm, Success } from '@components';
import { Trash, Eyes, Pen, ArrowRightSmall, ArrowSorting } from '@icons';

const initialProducts = [
  {
    id: 1,
    name: 'HP Pavilion 14-DV0514TX',
    sku: 'HP-LPTP-ZB14-i5-256GB',
    stock: 12,
    category: 'Electronic',
    price: '$960',
    published: true,
  },
  {
    id: 2,
    name: 'HP Pavilion 14-DV0514TX',
    sku: 'HP-LPTP-ZB14-i5-256GB',
    stock: 10,
    category: 'Electronic',
    price: '$960',
    published: false,
  },
  {
    id: 3,
    name: 'MacBook Pro M2',
    sku: 'APL-MBP-M2-512GB',
    stock: 8,
    category: 'Electronic',
    price: '$1299',
    published: true,
  },
  {
    id: 4,
    name: 'Dell XPS 13',
    sku: 'DLL-XPS13-i7-512GB',
    stock: 15,
    category: 'Electronic',
    price: '$1199',
    published: true,
  },
  {
    id: 5,
    name: 'Lenovo ThinkPad X1',
    sku: 'LNV-X1-i7-1TB',
    stock: 7,
    category: 'Electronic',
    price: '$1399',
    published: false,
  },
  {
    id: 6,
    name: 'ASUS ROG Strix',
    sku: 'ASU-ROG-R9-1TB',
    stock: 5,
    category: 'Electronic',
    price: '$1899',
    published: true,
  },
  {
    id: 7,
    name: 'Acer Predator',
    sku: 'ACR-PRD-i9-2TB',
    stock: 3,
    category: 'Electronic',
    price: '$2199',
    published: true,
  },
  {
    id: 8,
    name: 'MSI Gaming GS66',
    sku: 'MSI-GS66-i7-1TB',
    stock: 9,
    category: 'Electronic',
    price: '$1799',
    published: false,
  },
  {
    id: 9,
    name: 'Razer Blade 15',
    sku: 'RZR-BLD-i7-1TB',
    stock: 6,
    category: 'Electronic',
    price: '$1999',
    published: true,
  },
  {
    id: 10,
    name: 'Microsoft Surface Laptop',
    sku: 'MSF-SFL-i5-512GB',
    stock: 11,
    category: 'Electronic',
    price: '$1099',
    published: true,
  },
  {
    id: 11,
    name: 'LG Gram 17',
    sku: 'LG-GRM-i7-512GB',
    stock: 4,
    category: 'Electronic',
    price: '$1499',
    published: false,
  },
  {
    id: 12,
    name: 'Samsung Galaxy Book',
    sku: 'SMS-GLX-i5-512GB',
    stock: 13,
    category: 'Electronic',
    price: '$899',
    published: true,
  },
];

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Publish Modal
  const handlePublishToggle = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, published: !product.published }
          : product
      )
    );
    MySwal.fire({
      html: <Success message="This product was successfully unpublished" />,
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
            action={() => handlePublishToggle(data.id)}
            desc="Are you sure want to unpublish this product?"
            publish={true}
          />
        ),
        customClass: {
          popup: 'rounded-3xl py-10',
        },
        showConfirmButton: false,
      });
    } else {
      handlePublishToggle(data.id);
    }
  };

  // Replace the existing handleDelete function with this:
  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    MySwal.fire({
      html: <Success message="This product was successfully deleted" />,
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
          action={() => handleDelete(data.id)}
          desc="Are you sure want to delete this product?"
          publish={false}
          title="Delete Product?"
        />
      ),
      customClass: {
        popup: 'rounded-3xl py-10',
      },
      showConfirmButton: false,
    });
  };

  // Sorting product
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending',
  });
  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...products].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setProducts(sortedData);
    setSortConfig({ key, direction });
  };

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="w-full p-5 flex justify-center items-start">
      <div className="w-full mt-7 bg-[#FFFFFF] px-6 py-4 rounded-3xl">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-[25.63px] font-bold">Product</h1>
          <Link to="add">
            <button className="bg-primary hover:bg-red-dark text-white px-2 w-[132px] h-[32px] rounded-md text-[12.64px]">
              Add New Product
            </button>
          </Link>
        </div>

        <nav aria-label="Breadcrumb" className="flex mb-5">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                className="inline-flex items-center text-primary text-xs"
                to="/dashboard"
              >
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ArrowRightSmall />
                <span className="ml-1 text-primary text-xs md:ml-2">
                  Product
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="text-left mb-20 text-sm">
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => sortData('name')}
                  >
                    Product Name <ArrowSorting />
                  </button>
                </th>
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => sortData('sku')}
                  >
                    SKU Product <ArrowSorting />
                  </button>
                </th>
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => sortData('stock')}
                  >
                    Stock Product <ArrowSorting />
                  </button>
                </th>
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => sortData('category')}
                  >
                    Category <ArrowSorting />
                  </button>
                </th>
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => sortData('price')}
                  >
                    Price <ArrowSorting />
                  </button>
                </th>
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => sortData('published')}
                  >
                    Published <ArrowSorting />
                  </button>
                </th>
                <th className="px-4 py-2 text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={index}>
                  <td className="border-b px-4 py-2 text-xs text-black/60">
                    {product.name}
                  </td>
                  <td className="border-b px-4 py-2 text-xs text-black/60">
                    {product.sku}
                  </td>
                  <td className="border-b px-4 py-2 text-xs text-black/60">
                    {product.stock}
                  </td>
                  <td className="border-b px-4 py-2 text-xs text-black/60">
                    {product.category}
                  </td>
                  <td className="border-b px-4 py-2 text-xs text-black/60">
                    {product.price}
                  </td>
                  <td className="px-5 border-b border-gray-200">
                    <button
                      className={`p-[2px] w-10 h-[22px] rounded-full  transition-all ${
                        product.published ? 'bg-primary' : 'bg-[#D2D2D2]'
                      }`}
                      onClick={() => handlePublishModal(product)}
                    >
                      <div
                        className={` h-[18px] w-[18px] rounded-full bg-white transition-all ${
                          product.published && 'translate-x-full'
                        }`}
                      ></div>
                    </button>
                  </td>

                  <td className="px-5 py-2 border-b border-gray-200 text-type-text-light">
                    <div className="flex justify-start items-center space-x-3 lg:space-x-5">
                      <button onClick={() => navigate(`${product.id}`)}>
                        <Eyes />
                      </button>
                      <button onClick={() => navigate(`edit/${product.id}`)}>
                        <Pen />
                      </button>
                      <button onClick={() => handleDeleteModal(product)}>
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
          <div className="text-sm text-type-text-light font-medium">
            {startIndex + 1}-{endIndex} of {totalItems}
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-type-text-light">
                Rows per page:
              </span>
              <select
                className="text-type-text-light px-1"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="p-1 px-2 rounded-lg border"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
              <span className="text-sm text-[#171C26]">
                {currentPage}/{totalPages}
              </span>
              <button
                className="p-1 px-2 rounded-lg border"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
      </div>
    </div>
  );
};
export default Product;
