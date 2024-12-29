import React from 'react';

import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Card } from '@components';
import { Items, Clicks, Sales, Users } from '@icons';

const Summary = ({ data }) => {
  return (
    <Card className="grid lg:grid-cols-4 gap-3 rounded-md">
      <h2 className="lg:col-span-4 font-semibold text-xl">Summary</h2>
      <Card className="flex flex-col gap-5 rounded-md border">
        <div className="flex gap-2">
          <Users />
          <p className="font-semibold">Users</p>
        </div>
        <p className="font-semibold text-4xl">{data.users || <Skeleton />}</p>
        <div className="w-full h-1 bg-primary/50 rounded-full overflow-hidden">
          <div className="w-1/2 h-1 bg-primary"></div>
        </div>
      </Card>
      <Card className="flex flex-col gap-5 rounded-md border">
        <div className="flex gap-2">
          <Clicks />
          <p className="font-semibold">Orders</p>
        </div>
        <p className="font-semibold text-4xl">{data.orders || <Skeleton />}</p>
        <div className="w-full h-1 bg-primary/50 rounded-full overflow-hidden">
          <div className="w-1/2 h-1 bg-primary"></div>
        </div>
      </Card>
      <Card className="flex flex-col gap-5 rounded-md border">
        <div className="flex gap-2">
          <Sales />
          <p className="font-semibold">Sales</p>
        </div>
        <p className="font-semibold text-4xl">{data.sales || <Skeleton />}</p>
        <div className="w-full h-1 bg-primary/50 rounded-full overflow-hidden">
          <div className="w-1/2 h-1 bg-primary"></div>
        </div>
      </Card>
      <Card className="flex flex-col gap-5 rounded-md border">
        <div className="flex gap-2">
          <Items />
          <p className="font-semibold">Items</p>
        </div>
        <p className="font-semibold text-4xl">{data.items || <Skeleton />}</p>
        <div className="w-full h-1 bg-primary/50 rounded-full overflow-hidden">
          <div className="w-1/2 h-1 bg-primary"></div>
        </div>
      </Card>
    </Card>
  );
};

Summary.propTypes = {
  data: PropTypes.object,
};
export default Summary;
