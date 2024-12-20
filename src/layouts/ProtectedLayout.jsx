import React from 'react';

import { Outlet } from 'react-router-dom';

import { Footer, Navbar } from '@components';

const ProtectedLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default ProtectedLayout;
