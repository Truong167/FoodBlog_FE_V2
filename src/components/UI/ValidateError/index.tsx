import React, { Fragment } from 'react';

type TValidateError = {
  error: any;
}

const ValidateError: React.FC<TValidateError> = ({ error }) => {

  return (
      <p className="text-red-600">{error?.message}</p>
  );
};

export default ValidateError;
