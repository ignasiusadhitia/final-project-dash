import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { ForgotPasswordForm } from '@components';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted email', email);
    setEmail('');
  };

  const handleInputChange = (value) => {
    setEmail(value);
  };

  return (
    <div className="flex items-center h-screen">
      <div className=" w-full md:max-w-[45.625rem] mx-4 md:mx-auto bg-white rounded-[30px] py-12 md:py-[7.75rem] px-6 md:px-[12.5rem] shadow-md">
        <div className="w-full flex flex-col items-center">
          <h1 className="font-bold text-[1.625rem]">Forgot password?</h1>
          <p className="text-sm text-type-text-light text-center mt-3">
            No worries, we’ll send you reset instruction.
          </p>
          <ForgotPasswordForm
            email={email}
            onInputChangeHandler={handleInputChange}
            onSubmitHandler={handleSubmit}
          />
          <Link
            className="text-sm mt-6 text-primary hover:text-primary-dark"
            to="/"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
