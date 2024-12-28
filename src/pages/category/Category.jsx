import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { Card, Table, FormCategory, Confirm, Success } from '@components';
import { Trash, Pencil, ArrowRightSmall } from '@icons';

const Category = () => {
  const navigate = useNavigate();
  // PROPS TABLE HEADER & DATA
  const tableHeader = ['Category Name', 'Category Icon', 'Published', 'Action'];
  const dataKey = ['name', 'image', 'published'];
  const dummyData = [
    {
      id: 1,
      name: 'Electronics',
      image: 'Electronics',
      published: true,
    },
    {
      id: 2,
      name: 'Home & Lifestyle',
      image: 'Home & Lifestyle',
      published: false,
    },
    {
      id: 3,
      name: 'Fashion',
      image: 'Fashion',
      published: true,
    },
  ];
  const [tableData, setTableData] = useState(dummyData);
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  // SORTING
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending',
  });
  // HANDLE ROW CHANGE
  const handleRowChange = (event) => {
    setRowsPerPage(Number(event.target.value));
  };

  // ADD CATEGORY
  const handleAddCategory = (e, data) => {
    e.preventDefault();
    const newData = {
      id: new Date().getTime(),
      name: data.name,
      image: data.image.name,
      published: data.published || false,
    };
    setTableData([...tableData, newData]);
    MySwal.fire({
      html: <Success message="This category was successfully added" />,
      customClass: {
        popup: 'rounded-3xl w-auto md:w-[720px]',
      },
      showConfirmButton: false,
      timer: 1000,
    });
  };
  const handleOpenAddCategory = () => {
    MySwal.fire({
      html: <FormCategory action={handleAddCategory} />,
      showConfirmButton: false,
    });
  };

  // TABLE ACTIONS (Edit & Delete)
  // Edit
  const handleEditCategory = (e, data) => {
    e.preventDefault();
    console.log(data);
    const newData = {
      id: data.id,
      name: data.name,
      image: data.image.name || data.image,
      published: data.published,
    };
    setTableData(
      tableData.map((item) => (item.id === data.id ? newData : item))
    );
    MySwal.fire({
      html: <Success message="This category was successfully edited" />,
      customClass: {
        popup: 'rounded-3xl w-auto md:w-[720px]',
      },
      showConfirmButton: false,
      timer: 1000,
    });
  };
  // Toggle modal for Edit
  const handleOpenEditCategory = (data) => {
    MySwal.fire({
      html: <FormCategory action={handleEditCategory} data={data} />,
      showConfirmButton: false,
    });
  };

  // Delete
  const handleDelete = (data) => {
    const newData = tableData.filter((item) => item.id !== data.id);
    setTableData(newData);
    MySwal.fire({
      html: (
        <Success message={`Data with id:${data.id} successfully deleted`} />
      ),
      customClass: {
        popup: 'rounded-3xl w-auto md:w-[720px]',
      },
      showConfirmButton: false,
      timer: 1000,
    });
  };
  // Toggle modal for delete
  const handleOpenDeleteModal = (data = []) => {
    MySwal.fire({
      html: (
        <Confirm
          action={() => handleDelete(data)}
          desc="Are you sure want to delete this category?"
          publish={false}
          title="Delete Category?"
        />
      ),
      customClass: {
        popup: 'rounded-3xl py-10',
      },
      showConfirmButton: false,
    });
  };

  // PROPS TABLE ACTIONS (Insert action icon and its paired function as props)
  const actions = [
    {
      icon: Pencil,
      action: (data) => handleOpenEditCategory(data),
    },
    {
      icon: Trash,
      action: (id) => handleOpenDeleteModal(id),
    },
  ];

  // PROPS PUBLISH CATEGORY (Publish or unpublish category function)
  const handleUnpublish = (data) => {
    // Pending: Process backend
    const newData = tableData.map((item) => {
      if (item.id === data.id) {
        return { ...item, published: false };
      }
      return item;
    });
    setTableData(newData);
    MySwal.fire({
      html: (
        <Success
          message={`Successfuly Unpublish Category with id = ${data.id}`}
        />
      ),
      customClass: {
        popup: 'rounded-3xl w-auto md:w-[720px]',
      },
      showConfirmButton: false,
      timer: 1000,
    });
  };
  const handleOpenPublishModal = (data) => {
    if (data.published) {
      MySwal.fire({
        html: (
          <Confirm
            action={() => handleUnpublish(data)}
            desc="Are you sure want to unpublish this category?"
            publish={true}
          />
        ),
        customClass: {
          popup: 'rounded-3xl py-10',
        },
        showConfirmButton: false,
      });
    } else {
      const newData = tableData.map((item) => {
        if (item.id === data.id) {
          return { ...item, published: true };
        }
        return item;
      });
      setTableData(newData);
      MySwal.fire({
        html: (
          <Success
            message={`Successfuly Publish Category with id = ${data.id}`}
          />
        ),
        customClass: {
          popup: 'rounded-3xl w-auto md:w-[720px]',
        },
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  // PROPS SORT CATEGORY
  const sortData = (key) => {
    // First click on key parameter always sort by ascending
    let direction = 'ascending';
    // If sortConfig.key is the same as the key parameter, then the direction is reversed
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    // Sorting data
    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setTableData(sortedData);
    setSortConfig({ key, direction });
  };
  const sort = [
    () => sortData('name'),
    () => sortData('image'),
    () => sortData('published'),
  ];

  return (
    <main className="w-full px-5 pt-12 overflow-hidden">
      <Card className="rounded-3xl h-auto">
        {/* HEADER */}
        <div className="flex justify-between mb-10 items-baseline">
          <header className="space-y-2">
            <h1 className="text-[25.63px] font-bold">Category</h1>
            {/* BREADCRUMB */}
            <p className="flex gap-2 items-center">
              <span
                className="text-primary cursor-pointer text-xs"
                onClick={() => navigate('/dashboard')}
              >
                Home
              </span>
              <ArrowRightSmall />
              <span className="text-primary text-xs">Category</span>
            </p>
          </header>
          <button
            className="flex justify-center items-center text-[12.64px] rounded-md text-white px-2 bg-primary w-[128px] h-[32px]"
            onClick={handleOpenAddCategory}
          >
            Add New Category
          </button>
        </div>
        {/* TABLE */}
        <div className="overflow-auto">
          <Table
            actions={actions}
            dataKey={dataKey}
            publish={handleOpenPublishModal}
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
    </main>
  );
};

export default Category;
