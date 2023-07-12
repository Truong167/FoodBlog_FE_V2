import { Input } from 'antd';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import ValidateError from '../ValidateError';


const InputText: React.FC<Recipe.TPropsForm> = ({
  name,
  control,
  type,
  size,
  error,
  placeholder,
  prefix,
  className,
}) => {
  console.log(error)
  const isError = error.hasOwnProperty(name) ? `error` : `focus hover`;
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            size={size}
            placeholder={placeholder}
            prefix={prefix}
            className={classNames(isError, className)}
          />
        )}
      />
      <ValidateError error={error} name={name} />
    </Fragment>
  );
};

export default InputText;