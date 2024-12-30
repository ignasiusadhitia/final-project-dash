import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Hamburger, Close } from '@icons';

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
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    setIsOpen(false);
  }, [navigate])

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button onClick={handleSidebar} className='lg:hidden absolute z-40 right-5 top-3'>
        {isOpen ? <Close /> : <Hamburger />}
      </button>
      <aside className={`absolute z-20 bg-transparent ${!isOpen ? "-translate-x-full" : "-translate-x-0 backdrop-blur-sm"} transition duration-150 lg:-translate-x-0 lg:static w-full lg:w-[218px] flex-shrink-0 text-white h-screen bg-[#FFFFFF]`}>
        <header className="w-[218px] lg:w-auto bg-type-text flex gap-4 px-7 items-center h-[66px]">
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

        <div className="py-6 w-[218px] bg-white h-full lg:w-full">
          <ul className="flex flex-col gap-5">
            {menuItems.map(({ path, label, icon, activeIcon }) => {
              const isActive =
                path === '/dashboard'
                  ? location === path
                  : location.startsWith(path);

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
    </>
  );
};

export default Sidebar;
