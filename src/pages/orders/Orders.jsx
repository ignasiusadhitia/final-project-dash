import React, { useState } from 'react';

import ExcelJS from 'exceljs';

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

  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    // Add header to the worksheet
    worksheet.columns = [
      { header: 'Order ID', key: 'order_id', width: 10 },
      { header: 'Username', key: 'username', width: 20 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'Payment Method', key: 'payment_method', width: 20 },
      { header: 'Amount', key: 'amount', width: 10 },
      { header: 'Status', key: 'status_order', width: 15 },
      { header: 'Product Name', key: 'product_name', width: 30 },
      { header: 'Product Quantity', key: 'product_amount', width: 15 },
      { header: 'Product Unit Price', key: 'product_unit_price', width: 20 },
      { header: 'Product Total Price', key: 'product_total_price', width: 20 },
      { header: 'Sub Total', key: 'sub_total', width: 15 },
    ];

    // Add data to the worksheet
    dummyData.forEach((order) => {
      order.products.forEach((product) => {
        worksheet.addRow({
          order_id: order.id,
          username: order.username,
          address: order.address,
          payment_method: order.payment_method,
          amount: order.amount,
          status_order: order.status_order,
          product_name: product.name,
          product_amount: product.amount,
          product_unit_price: product.unit_price,
          product_total_price: product.total_price,
          sub_total: order.sub_total,
        });
      });
    });

    // Write buffer for Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Create blob and link to download file
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'orders.xlsx'; // File name that will be downloaded
    link.click();
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
