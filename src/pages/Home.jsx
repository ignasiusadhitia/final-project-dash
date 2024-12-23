import React from 'react';

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

import { Card } from '@components';
import { Items, Clicks, Sales, Users, Next } from '@icons';

const Home = () => {
  const summaryData = [
    {
      icon: <Users />,
      title: 'Users',
      value: '35k',
    },
    {
      icon: <Clicks />,
      title: 'Orders',
      value: '40',
    },
    {
      icon: <Sales />,
      title: 'Sales',
      value: '345$',
    },
    {
      icon: <Items />,
      title: 'Items',
      value: '68',
    },
  ];
  const salesData = [
    {
      month: 'Jan',
      sales: 10000000,
    },
    {
      month: 'Feb',
      sales: 90000000,
    },
    {
      month: 'Mar',
      sales: 50000000,
    },
    {
      month: 'Apr',
      sales: 60000000,
    },
    {
      month: 'Mei',
      sales: 40000000,
    },
    {
      month: 'Jun',
      sales: 80000000,
    },
    {
      month: 'Jul',
      sales: 70000000,
    },
    {
      month: 'Aug',
      sales: 70000000,
    },
    {
      month: 'Sep',
      sales: 50000000,
    },
    {
      month: 'Oct',
      sales: 20000000,
    },
    {
      month: 'Nov',
      sales: 40000000,
    },
    {
      month: 'Des',
      sales: 70000000,
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
    <main className="grid lg:grid-cols-[1fr,270px] 2xl:grid-cols-[1fr,400px] gap-10 p-5 w-full">
      {/* SUMMARY */}
      <section>
        <Card className="grid lg:grid-cols-4 gap-3">
          <h2 className="lg:col-span-4 font-semibold text-xl">Summary</h2>
          {summaryData.map((item, index) => (
            <Card key={index} className="flex flex-col gap-5">
              <div className="flex gap-2">
                {item.icon}
                <p className="font-semibold">{item.title}</p>
              </div>
              <p className="font-semibold text-4xl">{item.value}</p>
              <div className="w-full h-1 bg-primary/50 rounded-full overflow-hidden">
                <div className="w-1/2 h-1 bg-primary"></div>
              </div>
            </Card>
          ))}
        </Card>
      </section>

      {/* TOTAL EARNING */}
      <section>
        <Card className="grid gap-4">
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
        <Card>
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
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
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
                  dataKey="sales"
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
        <Card>
          <h2 className="font-semibold text-lg mb-5">Best Item Sales</h2>
          <div className="flex flex-col gap-3">
            {bestItemSales.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex gap-5">
                  <Items className="w-16 h-16" />
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
