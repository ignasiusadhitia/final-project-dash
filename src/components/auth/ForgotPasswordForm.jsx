import React from 'react';

import PropTypes from 'prop-types';

const ForgotPasswordForm = ({
  email,
  onSubmitHandler,
  onInputChangeHandler,
}) => {
  return (
    <form className="mt-5" onSubmit={onSubmitHandler}>
      <label className="text-sm" htmlFor="email text-type">
        Email
      </label>
      <input
        className="w-full mt-3 border-[1px] border-surface-border bg-surface-background px-[15px] py-[14px] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        name="email"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(event) => onInputChangeHandler(event.target.value)}
      />

      <button
        className="w-full mt-7 pt-3 pb-[15px] bg-primary hover:bg-primary-dark rounded-lg text-surface-neutral text-base font-medium"
        type="submit"
      >
        Send Email
      </button>
    </form>
  );
};

ForgotPasswordForm.propTypes = {
  email: PropTypes.string,
  onSubmitHandler: PropTypes.func,
  onInputChangeHandler: PropTypes.func,
};

export default ForgotPasswordForm;
