import { Input } from 'antd';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import ValidateError from '../../ValidateError';
import classNames from 'classnames';


const { TextArea } = Input;

const AntdTextArea: React.FC<Recipe.TPropsForm> = ({
  control,
  name,
  autoSize,
  size,
  error,
  className,
  placeholder
}) => {
  const isError = error.hasOwnProperty(name) ? `error` : `focus hover`;

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            autoSize={autoSize}
            size={size}
            className={classNames(isError, className)}
            placeholder={placeholder}
          />
        )}
      />
      <ValidateError error={error} name={name} />
    </Fragment>
  );
};

export default AntdTextArea;
