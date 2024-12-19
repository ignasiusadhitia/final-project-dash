import React, { useRef, useState } from 'react';

import { InputOTPForm } from '@components';

const InputOTP = () => {
  const length = 6; // OTP length
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
    <div>
      <InputOTPForm
        inputsRef={inputs}
        length={length}
        otp={otp}
        onBackspaceHandler={handleBackspace}
        onInputChangeHandler={handleInputChange}
        onPasteHandler={handlePaste}
        onSubmitHandler={handleSubmit}
      />
    </div>
  );
};

export default InputOTP;
