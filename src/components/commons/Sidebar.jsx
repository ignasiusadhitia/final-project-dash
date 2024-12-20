import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import {
  Home,
  Product,
  Category,
  Orders,
  Promotion,
  Banner,
  Rating,
  Stock,
  Side,
  SideTransparant,
  HomeActive,
  ProductActive,
  CategoryActive,
  OrdersActive,
  PromotionActive,
  BannerActive,
  RatingActive,
  StockActive,
} from '@icons';

const Sidebar = () => {
  const location = useLocation().pathname;

  const menuItems = [
    {
      path: '/dashboard',
      label: 'Home',
      icon: <Home />,
      activeIcon: <HomeActive />,
    },
    {
      path: '/dashboard/products',
      label: 'Product',
      icon: <Product />,
      activeIcon: <ProductActive />,
    },
    {
      path: '/dashboard/categories',
      label: 'Category',
      icon: <Category />,
      activeIcon: <CategoryActive />,
    },
    {
      path: '/dashboard/orders',
      label: 'Orders',
      icon: <Orders />,
      activeIcon: <OrdersActive />,
    },
    {
      path: '/dashboard/promotions',
      label: 'Promotion',
      icon: <Promotion />,
      activeIcon: <PromotionActive />,
    },
    {
      path: '/dashboard/banners',
      label: 'Banner Management',
      icon: <Banner />,
      activeIcon: <BannerActive />,
    },
    {
      path: '/dashboard/ratings',
      label: 'Rating',
      icon: <Rating />,
      activeIcon: <RatingActive />,
    },
    {
      path: '/dashboard/stocks',
      label: 'Stock',
      icon: <Stock />,
      activeIcon: <StockActive />,
    },
  ];

  return (
    <aside className="w-[218px] text-white h-screen bg-[#FFFFFF]">
      <header className="bg-type-text flex gap-4 px-7 items-center h-[66px]">
        <img
          alt="user"
          className="w-[28px] h-[28px] rounded-full"
          src="https://picsum.photos/200/300"
        />
        <div>
          <h1 className="text-[12.64px] font-normal">Anita Cruz</h1>
          <p className="text-[10px] font-normal">anita@commerce.com</p>
        </div>
      </header>

      <div className="py-6 w-full">
        <ul className="flex flex-col gap-5">
          {menuItems.map(({ path, label, icon, activeIcon }) => {
            const isActive = location === path;

            return (
              <li key={path} className={'relative flex items-center gap-7'}>
                {isActive ? <Side /> : <SideTransparant />}
                <Link
                  className={`text-[14.22px] flex gap-3 ${isActive ? 'text-primary' : 'text-type-text'}`}
                  to={path}
                >
                  {isActive ? activeIcon : icon}
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
