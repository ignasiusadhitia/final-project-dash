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
    <form className="mt-11" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-4 gap-2 mx-[10px]">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            className="border-[1px] border-surface-border bg-surface-background py-[13px] rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary"
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
      <button
        className="w-full mt-7 pt-3 pb-[15px] bg-primary hover:bg-primary-dark rounded-lg text-surface-neutral text-base font-medium"
        type="submit"
      >
        Send OTP
      </button>
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
