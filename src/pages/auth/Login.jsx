import React from 'react';

import { AuthBanner, LoginForm } from '@components';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <main className="container min-h-[75%] grid grid-cols-2 bg-white py-5 px-[30px] rounded-[30px] shadow-md">
        <div className="w-full flex flex-col justify-center items-center">
          <LoginForm />
        </div>
        <AuthBanner />
      </main>
    </div>
  );
};

export default Login;
