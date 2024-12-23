import React from 'react';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { Card, Table, FormCategory, Confirm, Success } from '@components';
import { Trash, Pencil, Chevron } from '@icons';

const Category = () => {
  const navigate = useNavigate();

  // PROPS TABLE HEADER & DATA
  const tableHeader = ['Category Name', 'Category Icon', 'Published', 'Action'];
  const tableData = [
    {
      id: 1,
      category: 'Electronics',
      icon: 'Electronics',
      published: true,
    },
    {
      id: 2,
      category: 'Home & Lifestyle',
      icon: 'Home & Lifestyle',
      published: false,
    },
  ];

  // ADD CATEGORY
  const handleAddCategory = (e) => {
    e.preventDefault();
    MySwal.fire({
      html: <Success message="This category was successfully added" />,
      customClass: {
        popup: 'rounded-md w-auto md:w-[720px]',
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
  const handleEditCategory = (e) => {
    e.preventDefault();
    MySwal.fire({
      html: <Success message="This category was successfully edited" />,
      customClass: {
        popup: 'rounded-md w-auto md:w-[720px]',
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
    MySwal.fire({
      html: (
        <Success
          message={`Successfuly Unpublish Category with id = ${data.id}`}
        />
      ),
      customClass: {
        popup: 'rounded-md w-auto md:w-[720px]',
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
        showConfirmButton: false,
      });
    } else {
      alert(`Publish ${data.id}`);
    }
  };

  // PROPS SORT CATEGORY
  const sort = [
    {
      asc: () => alert('sort asc by name'),
      desc: () => alert('sort desc by name'),
    },
    {
      asc: () => alert('sort asc by icon'),
      desc: () => alert('sort desc by icon'),
    },
    {
      asc: () => alert('sort asc by publish'),
      desc: () => alert('sort desc by publish'),
    },
  ];

  return (
    <main className="border w-full p-5 overflow-hidden">
      <Card className="rounded-3xl h-auto">
        {/* HEADER */}
        <div className="flex justify-between mb-10">
          <header className="space-y-1">
            <h1 className="font-bold text-2xl">Category</h1>
            <p className="flex gap-1 items-center">
              <span
                className="text-primary cursor-pointer text-xs"
                onClick={() => navigate('/dashboard')}
              >
                Home
              </span>
              <Chevron className="w-3 h-3" />
              <span className="text-primary text-xs">Category</span>
            </p>
          </header>
          <button
            className="p-2 self-start text-white text-xs rounded-md bg-primary"
            onClick={handleOpenAddCategory}
          >
            Add New Category
          </button>
        </div>
        {/* TABLE */}
        <div className="overflow-auto">
          <Table
            actions={actions}
            publish={handleOpenPublishModal}
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
    </main>
  );
};

export default Category;
