import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { LeftChevron, RightChevron, Delete, Details, Edit, ArrowSorting } from '@icons';

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

  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);

    const sortedData = [...products].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setProducts(sortedData);
  };

  const handlePublishToggle = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, published: !product.published }
          : product
      )
    );
  };

  // Replace the existing handleDelete function with this:
  const handleDelete = (productId) => {
    Swal.fire({
      title: 'Delete Product?',
      text: "Are you sure you want to delete this product?",
      iconHtml: '<i class="w-20 h-20 text-red-500 rounded-full p-1" style="background-color: transparent; border: none;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></i>',
      customClass: {
        icon: 'border: 3px solid #EF4444'
      },
      showCancelButton: true, confirmButtonColor: '#EF4444', cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter((product) => product.id !== productId));
        Swal.fire({
          title: 'This product was successfully deleted!',
          icon: 'success',
          confirmButtonColor: '#EF4444'
        });
      }
    });
  };



  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-100 mx-auto my-10 p-4">
      <div className="container bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Product</h1>

          <Link to="add">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Add New Product
            </button>
          </Link>
        </div>

        <nav aria-label="Breadcrumb" className="flex mb-5">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                className="inline-flex items-center text-red-500 hover:text-red-300"
                to="/dashboard"
              >
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-red-500 md:ml-2">Product</span>
              </div>
            </li>
          </ol>
        </nav>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="text-left mb-20 text-sm">
                <th onClick={() => handleSort('name')} className="px-5 py-3 whitespace-nowrap cursor-pointer">
                  Product Name <ArrowSorting className={`inline-block ${sortField === 'name' ? 'text-blue-500' : ''}`} />
                </th>
                <th onClick={() => handleSort('sku')} className="px-5 py-3 whitespace-nowrap cursor-pointer">
                  SKU Product <ArrowSorting className={`inline-block ${sortField === 'sku' ? 'text-blue-500' : ''}`} />
                </th>
                <th onClick={() => handleSort('stock')} className="px-5 py-3 whitespace-nowrap cursor-pointer">
                  Stock Product <ArrowSorting className={`inline-block ${sortField === 'stock' ? 'text-blue-500' : ''}`} />
                </th>
                <th onClick={() => handleSort('category')} className="px-5 py-3 whitespace-nowrap cursor-pointer">
                  Category <ArrowSorting className={`inline-block ${sortField === 'category' ? 'text-blue-500' : ''}`} />
                </th>
                <th onClick={() => handleSort('price')} className="px-5 py-3 whitespace-nowrap cursor-pointer">
                  Price <ArrowSorting className={`inline-block ${sortField === 'price' ? 'text-blue-500' : ''}`} />
                </th>
                <th onClick={() => handleSort('published')} className="px-5 py-3 whitespace-nowrap cursor-pointer">
                  Published <ArrowSorting className={`inline-block ${sortField === 'published' ? 'text-blue-500' : ''}`} />
                </th>
                <th className="px-5 py-3 whitespace-nowrap">Action</th>
              </tr>            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
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
                    <div className="flex justify-center items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          checked={product.published}
                          className="sr-only peer"
                          type="checkbox"
                          onChange={() => handlePublishToggle(product.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </td>

                  <td className="px-5 py-2 border-b border-gray-200 flex justify-start items-center space-x-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`${product.id}`)}
                    >
                      <Details />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`edit/${product.id}`)}
                    >
                      <Edit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Delete />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center px-5 py-3 ">
            <div className="text-sm text-gray-700">
              {startIndex + 1}-{endIndex} of {totalItems}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center me-4">
                <span className="mr-2 text-sm text-gray-700">
                  Rows per page:
                </span>
                <select
                  className="border rounded px-2 py-1"
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
                  className={`px-2 py-1 rounded-lg border ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <LeftChevron className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-700">
                  {currentPage}/{totalPages}
                </span>
                <button
                  className={`px-2 py-1 rounded-lg border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  <RightChevron className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default Product;


