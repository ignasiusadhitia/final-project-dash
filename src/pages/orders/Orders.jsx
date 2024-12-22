import React, { useState } from 'react';

import { ConfirmationModal, OrderList } from '@components';

const dummyData = [
  {
    id: 1,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: '250',
    status_order: 'created',
  },
  {
    id: 2,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 150,
    status_order: 'process',
  },
  {
    id: 3,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 250,
    status_order: 'canceled',
  },
  {
    id: 4,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: 150,
    status_order: 'completed',
  },
  {
    id: 5,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: '250',
    status_order: 'created',
  },
  {
    id: 6,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 150,
    status_order: 'process',
  },
  {
    id: 7,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 250,
    status_order: 'canceled',
  },
  {
    id: 8,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: 150,
    status_order: 'completed',
  },
  {
    id: 9,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: '250',
    status_order: 'created',
  },
  {
    id: 10,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 150,
    status_order: 'process',
  },
  {
    id: 11,
    username: 'philfoden',
    address: 'Jl. Jendral Sudirman No. 43',
    payment_method: 'Gopay',
    amount: 250,
    status_order: 'canceled',
  },
  {
    id: 12,
    username: 'kevindebruyne',
    address: 'Jl. Pangeran Antasari No.13',
    payment_method: 'Debit Online',
    amount: 150,
    status_order: 'completed',
  },
];

const Orders = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => {
    setShowConfirmation((prev) => !prev);
  };

  return (
    <main className="w-full p-5 flex justify-center items-start">
      {showConfirmation && (
        <ConfirmationModal onShowConfirmationHandler={handleShowConfirmation} />
      )}
      <OrderList
        orders={dummyData}
        onShowConfirmationHandler={handleShowConfirmation}
      />
    </main>
  );
};

export default Orders;
