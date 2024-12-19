import React, { useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import { InputOTPForm } from '@components';

const InputOTP = () => {
  const length = 4; // OTP length
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleInputChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (value, index) => {
    if (!value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (data) => {
    const newOtp = [...otp];
    data.forEach((char, index) => {
      if (index < length) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    const nextIndex = Math.min(data.length, length - 1);
    inputs.current[nextIndex].focus();
  };

  const handleSubmit = () => {
    console.log('submitted OTP', otp.join(''));
  };

  return (
    <div className="flex items-center h-screen">
      <div className=" w-full md:max-w-[45.625rem] mx-4 md:mx-auto bg-white rounded-[30px] py-12 md:py-[7.75rem] px-6 md:px-[12.5rem] shadow-md">
        <div className="w-full flex flex-col items-center">
          <h1 className="font-bold text-[1.625rem]">Input OTP</h1>
          <p className="text-sm text-type-text-light text-center mt-3">
            we send you one time password (OTP) on the email
          </p>
          <InputOTPForm
            inputsRef={inputs}
            length={length}
            otp={otp}
            onBackspaceHandler={handleBackspace}
            onInputChangeHandler={handleInputChange}
            onPasteHandler={handlePaste}
            onSubmitHandler={handleSubmit}
          />

          <Link className="text-sm mt-6 text-primary" to="/">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InputOTP;
