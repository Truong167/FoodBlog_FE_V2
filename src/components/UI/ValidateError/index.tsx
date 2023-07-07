import React, { Fragment } from 'react';

interface IValidateError {
  error: any;
  name: string;
}

const ValidateError: React.FC<IValidateError> = ({ error, name }) => {

  return (
    <Fragment>
      {error.hasOwnProperty(name) && <p className="text-red-600">{error[name]?.message}</p>}
    </Fragment>
  );
};

export default ValidateError;
