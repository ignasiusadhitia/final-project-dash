import React from 'react';

import { AuthBanner, LoginForm } from '@components';

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 md:py-[8.625rem] xxl:px-0">
      <main className="container md:h-[824px] grid grid-cols-1 md:grid-cols-2 bg-white py-10 md:py-5 px-[30px] rounded-[30px] shadow-md">
        <div className="w-full flex flex-col justify-center items-center">
          <LoginForm />
        </div>
        <AuthBanner />
      </main>
    </div>
  );
};

export default Login;
