import React from 'react';

import PropTypes from 'prop-types';

import { StatusPill } from '@components';

const OrderDetails = ({
  order,
  onShowOrderDetailsHandler,
  onChangeStatusHandler,
  onTrackingNumberChangeHandler,
  trackingNumber,
}) => {
  return (
    <div className="w-screen h-screen bg-[#101010] bg-opacity-40 absolute top-0 left-0 flex justify-center items-center">
      <div className="bg-white max-w-[592px] rounded-[10px] p-5">
        <div className="flex justify-between items-center">
          <h1 className="font-['Nunito'] font-bold text-[18.4px]">
            Detail Order
          </h1>
          <div>
            <StatusPill status={order?.status_order} />
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-10 mr-[46px] text-xs text-type-text">
          <div className="flex gap-6">
            <span className="block w-[120px]">Customer Name</span>
            <span className="block grow capitalize">{order?.username}</span>
          </div>
          <div className="flex gap-6">
            <span className="block w-[120px]">Address</span>
            <span className="block grow">{order?.address}</span>
          </div>
          <div className="flex gap-6">
            <span className="block w-[120px]">Payment Method</span>
            <span className="block grow">{order?.payment_method}</span>
          </div>
        </div>

        <div className="mt-9 text-xs">
          <table className="text-left">
            <thead>
              <tr className="grid grid-cols-4 gap-6 px-3 pt-4 pb-5 border-b border-surface-border text-[#111111]">
                <th>Product Name</th>
                <th>Amount</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {console.log(order)}
              {order?.products?.map((product) => (
                <tr
                  key={product.id}
                  className="grid grid-cols-4 gap-6 px-3 py-2 border-b border-surface-border text-[#111111] opacity-80"
                >
                  <td>{product.name}</td>
                  <td>{product.amount}</td>
                  <td>${product.unit_price}</td>
                  <td>${product.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-4 gap-6 px-3 py-[9.5px] items-center">
            <span className="block"></span>
            <span className="block"></span>
            <span className="block text-left">Sub Total</span>
            <span className="block text-left text-sm font-medium">
              ${order?.sub_total}
            </span>
          </div>
        </div>
        {order?.status_order === 'process' ? (
          <div className="flex flex-col text-[14.22px] mt-5">
            <label htmlFor="trackingNumber">Tracking Number</label>
            <input
              className="border-[1px] px-[13px] py-[15px] bg-surface-background rounded-lg mt-2"
              id="tracking_number"
              name="tracking_number"
              placeholder="Enter Tracking Number"
              type="text"
              onChange={onTrackingNumberChangeHandler}
            />
          </div>
        ) : null}

        {order?.status_order === 'canceled' ||
        order?.status_order === 'completed' ? (
          <div className="flex justify-end mt-[50px]">
            <button
              className="w-[100px] h-[32px] flex justify-center items-center rounded text-[12.64px] bg-type-text-light hover:bg-type-text-disable text-white"
              onClick={onShowOrderDetailsHandler}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-4 text-[12.64px] mt-[50px]">
            <button
              className="w-[100px] h-[32px] flex justify-center items-center rounded border-[1px] border-primary text-primary hover:bg-primary hover:text-white"
              onClick={onShowOrderDetailsHandler}
            >
              Cancel
            </button>
            <button
              className="w-[100px] h-[32px] flex justify-center items-center rounded bg-primary hover:bg-primary-dark disabled:bg-surface-background-2 text-white"
              disabled={!trackingNumber && order?.status_order === 'process'}
              onClick={() =>
                onChangeStatusHandler(order.id, order.status_order)
              }
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.object,
  onShowOrderDetailsHandler: PropTypes.func,
  onChangeStatusHandler: PropTypes.func,
  onTrackingNumberChangeHandler: PropTypes.func,
  trackingNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default OrderDetails;