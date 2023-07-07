import { Input } from 'antd';
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
  const isError = error.hasOwnProperty(name) ? `error` : `focus hover`;
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${type}` }}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            size={size}
            placeholder={placeholder}
            prefix={prefix}
            className={`${isError} ${className}`}
          />
        )}
      />
      <ValidateError error={error} name={name} />
    </Fragment>
  );
};

export default InputText;