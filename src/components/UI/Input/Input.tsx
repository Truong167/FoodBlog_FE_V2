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
  placeholder,
  prefix,
  className,
  suffix,
  autoComplete
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <Input
            autoComplete={autoComplete}
            {...field}
            type={type}
            size={size}
            placeholder={placeholder}
            prefix={prefix}
            suffix={suffix}
            className={classNames(error ? `error` : `focus hover`, className)}
          />
          <ValidateError error={error} />
        </Fragment>
      )}
    />
  );
};

export default InputText;