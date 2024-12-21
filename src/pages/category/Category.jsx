// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from 'react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { Card, Table, FormCategory } from '@components';
import { Trash, Pencil, Chevron } from '@icons';

const Category = () => {
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
  const handleDelete = (id) => {
    alert(`Delete ${id}`);
  };
  const actions = [
    {
      icon: Pencil,
      action: (id) => alert(`Edit ${id}`),
    },
    {
      icon: Trash,
      action: (id) => handleDelete(id),
    },
  ];
  const handlePublish = (data) => {
    if (data.published) {
      alert(`Unpublish ${data.id}`);
    } else {
      alert(`Publish ${data.id}`);
    }
  };
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

  const handleAddCategory = () => {
    MySwal.fire({
      html: <FormCategory />,
      showConfirmButton: false,
    });
  };

  return (
    <main className="border w-full p-5 overflow-hidden">
      <Card className="rounded-3xl h-auto">
        {/* HEADER */}
        <div className="flex justify-between mb-10">
          <header>
            <h1 className="font-bold text-2xl">Category</h1>
            <p>Home - Category </p>
          </header>
          <button
            className="p-2 self-start text-white text-xs rounded-md bg-primary"
            onClick={handleAddCategory}
          >
            Add New Category
          </button>
        </div>
        {/* TABLE */}
        <div className="overflow-auto">
          <Table
            actions={actions}
            publish={handlePublish}
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
