import React, { useState } from 'react';

// SWAL
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { OrderDetails, OrderList, Confirm, Success } from '@components';

const dummyData = [
  {
    id: 1,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: '250',
    status_order: 'created',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
  {
    id: 2,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 150,
    status_order: 'process',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
  {
    id: 3,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 250,
    status_order: 'canceled',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
  {
    id: 4,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: 150,
    status_order: 'completed',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
  {
    id: 5,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: '250',
    status_order: 'created',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
  {
    id: 6,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 150,
    status_order: 'process',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
  {
    id: 7,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 250,
    status_order: 'canceled',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
  {
    id: 8,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: 150,
    status_order: 'completed',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
  {
    id: 9,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: '250',
    status_order: 'created',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
  {
    id: 10,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 150,
    status_order: 'process',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
  {
    id: 11,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 250,
    status_order: 'canceled',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
  {
    id: 12,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: 150,
    status_order: 'completed',
    products: [
      {
        id: 1,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
      {
        id: 2,
        name: 'Nike Air Jordan 1',
        amount: 2,
        unit_price: 250,
        total_price: 500,
      },
    ],
    sub_total: 1000,
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(dummyData);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleShowConfirmation = (data) => {
    MySwal.fire({
      html: (
        <Confirm
          action={() => handleCancelOrder(data.id)}
          desc="Are you sure want to decline this order?"
        />
      ),
      customClass: {
        popup: 'rounded-3xl py-10',
      },
      showConfirmButton: false,
    });
  };

  const handleUpdateOrderStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status_order: newStatus } : order
      )
    );
  };

  const handleChangeStatus = (id, currentStatus) => {
    const nextStatus = { created: 'process', process: 'completed' }[
      currentStatus
    ];

    if (nextStatus) {
      handleUpdateOrderStatus(id, nextStatus);
    }
  };

  const handleCancelOrder = (id) => {
    handleUpdateOrderStatus(id, 'canceled');
    MySwal.fire({
      html: <Success message="This order was successfully canceled" />,
      customClass: {
        popup: 'rounded-3xl w-auto md:w-[720px]',
      },
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleTrackingNumberChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleDownload = () => {
    console.log('Downloded');
  };

  const handleShowOrderDetails = (id) => {
    const order = orders.find((order) => order.id === id);
    MySwal.fire({
      html: (
        <OrderDetails
          order={order}
          trackingNumber={trackingNumber}
          onChangeStatusHandler={handleChangeStatus}
          onTrackingNumberChangeHandler={handleTrackingNumberChange}
        />
      ),
      customClass: {
        popup: 'rounded-3xl',
      },
      showConfirmButton: false,
    });
  };
  console.log(trackingNumber);

  return (
    <main className="w-full p-5 flex justify-center items-start">
      <OrderList
        orders={orders}
        onDownloadHandler={handleDownload}
        onShowConfirmationHandler={handleShowConfirmation}
        onShowOrderDetailsHandler={handleShowOrderDetails}
      />
    </main>
  );
};

export default Orders;
