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
  className,
  placeholder
}) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: {error} }) => (
        <Fragment>
          <TextArea
            {...field}
            autoSize={autoSize}
            size={size}
            className={classNames(error ? `error` : `focus hover`, className)}
            placeholder={placeholder}
          />
          <ValidateError error={error} />
        </Fragment>
      )}
    />
  );
};

export default AntdTextArea;
