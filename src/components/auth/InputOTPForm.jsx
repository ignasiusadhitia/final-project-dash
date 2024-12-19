/* eslint-disable react/jsx-curly-newline */
import React from 'react';

import PropTypes from 'prop-types';

const InputOTPForm = ({
  otp,
  inputsRef,
  length,
  onInputChangeHandler,
  onBackspaceHandler,
  onPasteHandler,
  onSubmitHandler,
}) => {
  const handlePaste = (event) => {
    event.preventDefault();
    const data = event.clipboardData.getData('text').slice(0, length).split('');
    onPasteHandler(data);
  };

  return (
    <form className="max-w-[20.625rem mx-auto]" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-6">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            maxLength="1"
            type="text"
            value={value}
            onChange={(event) =>
              onInputChangeHandler(event.target.value, index)
            }
            onKeyDown={(event) => {
              if (event.key === 'Backspace')
                onBackspaceHandler(event.target.value, index);
            }}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <button type="submit">Send OTP</button>
    </form>
  );
};

InputOTPForm.propTypes = {
  otp: PropTypes.arrayOf(PropTypes.string),
  inputsRef: PropTypes.shape({
    current: PropTypes.arrayOf(PropTypes.instanceOf(Element)),
  }),
  onInputChangeHandler: PropTypes.func,
  onBackspaceHandler: PropTypes.func,
  onPasteHandler: PropTypes.func,
  onSubmitHandler: PropTypes.func,
  length: PropTypes.number,
};

export default InputOTPForm;
