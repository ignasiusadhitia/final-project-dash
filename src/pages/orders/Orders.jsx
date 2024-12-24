import React, { useState } from 'react';

import * as XLSX from 'xlsx';

import { ConfirmationModal, OrderDetails, OrderList } from '@components';

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleShowConfirmation = (id) => {
    setSelectedOrderId(id);
    setShowConfirmation((prev) => !prev);
  };

  const handleShowOrderDetails = (id) => {
    setShowOrderDetails((prev) => !prev);
    const order = orders.find((order) => order.id === id);
    setSelectedOrder(showOrderDetails ? null : order);
  };

  const handleUpdateOrderStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status_order: newStatus } : order
      )
    );
  };

  const handleChangeStatus = (id, currentStatus) => {
    setShowOrderDetails((prev) => !prev);
    const nextStatus = { created: 'process', process: 'completed' }[
      currentStatus
    ];

    if (nextStatus) {
      handleUpdateOrderStatus(id, nextStatus);
    }
  };

  const handleCancelOrder = (id) => {
    handleUpdateOrderStatus(id, 'canceled');
    setShowConfirmation(false);
  };

  const handleTrackingNumberChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleDownload = () => {
    // Format data for Excel
    const excelData = orders.map((order) => ({
      'User Name': order.username,
      Address: order.address,
      'Payment Method': order.payment_method,
      Amount: order.amount,
      'Status Order': order.status_order,
    }));

    // Create WorkBook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

    // Save as file
    XLSX.writeFile(workbook, 'orders.xlsx');
  };

  return (
    <main className="w-full p-5 flex justify-center items-start">
      {showConfirmation && (
        <ConfirmationModal
          id={selectedOrderId}
          onCancelOrderHandler={handleCancelOrder}
          onShowConfirmationHandler={handleShowConfirmation}
        />
      )}
      {showOrderDetails && (
        <OrderDetails
          order={selectedOrder}
          trackingNumber={trackingNumber}
          onChangeStatusHandler={handleChangeStatus}
          onShowOrderDetailsHandler={handleShowOrderDetails}
          onTrackingNumberChangeHandler={handleTrackingNumberChange}
        />
      )}
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
