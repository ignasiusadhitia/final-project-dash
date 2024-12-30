import React from 'react';

// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Card, Summary } from '@components';
import { Items, Next } from '@icons';

const Home = () => {
  const summaryDataDummy = {
    users: '35k',
    orders: '40',
    sales: '345$',
    items: '68',
  };
  const salesData = [
    {
      month: 'Jan',
      revenue: '10000000',
    },
    {
      month: 'Feb',
      revenue: '90000000',
    },
    {
      month: 'Mar',
      revenue: '50000000',
    },
    {
      month: 'Apr',
      revenue: '60000000',
    },
    {
      month: 'Mei',
      revenue: '40000000',
    },
    {
      month: 'Jun',
      revenue: '80000000',
    },
    {
      month: 'Jul',
      revenue: '70000000',
    },
    {
      month: 'Aug',
      revenue: '70000000',
    },
    {
      month: 'Sep',
      revenue: '50000000',
    },
    {
      month: 'Oct',
      revenue: '20000000',
    },
    {
      month: 'Nov',
      revenue: '40000000',
    },
    {
      month: 'Des',
      revenue: '70000000',
    },
  ];
  const bestItemSales = [
    {
      name: 'Kids Electric',
      category: 'Toys',
      url: 'https://www.google.com',
    },
    {
      name: 'Canon EOS',
      category: 'Electronic',
      url: 'https://www.google.com',
    },
    {
      name: 'Small Bookself',
      category: 'Furniture',
      url: 'https://www.google.com',
    },
    {
      name: 'Nike Air',
      category: 'Shoes',
      url: 'https://www.google.com',
    },
  ];

  return (
    <main className="grid lg:grid-cols-[1fr,270px] 2xl:grid-cols-[1fr,400px] gap-10 px-5 py-12 w-full">
      {/* SUMMARY */}
      <section>
        <Summary data={summaryDataDummy} />
      </section>

      {/* TOTAL EARNING */}
      <section>
        <Card className="grid gap-4 rounded-md">
          <div className="text-center flex flex-col items-center justify-between">
            <h2 className="font-semibold text-xl">Total earning this month</h2>
            <p className="text-6xl font-bold text-primary">310$</p>
            <p className="text-black/50 text-lg">
              total income profit this month
            </p>
          </div>
        </Card>
      </section>

      {/* REVENUE */}
      <section>
        <Card className=" rounded-md">
          <h2 className="font-semibold text-lg">Revenue</h2>
          <div className="h-[300px] my-5">
            <ResponsiveContainer height="100%" width="100%">
              <LineChart
                data={salesData}
                height={300}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                width={500}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(data) => `${(data / 1000000).toFixed(0)}M`}
                />
                <Tooltip />
                <Legend
                  align="right"
                  verticalAlign="top"
                  wrapperStyle={{
                    marginTop: -50,
                  }}
                />
                <Line
                  activeDot={{ r: 8 }}
                  dataKey="revenue"
                  dot={false}
                  legendType="circle"
                  stroke="red"
                  strokeWidth={2}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* BEST ITEM SALES */}
      <section>
        <Card className=" rounded-md">
          <h2 className="font-semibold text-lg mb-5">Best Item Sales</h2>
          <div className="flex flex-col gap-3">
            {bestItemSales.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex gap-5">
                  <Items className="w-14 h-14" />
                  <div>
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                  </div>
                </div>
                <a href="#">
                  <Next />
                </a>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Home;
