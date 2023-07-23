import { DatePicker } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

import ValidateError from '../ValidateError';

const AntdDatePicker: React.FC<Recipe.TPropsForm> = ({
  control,
  name,
  format,
  className,
  size,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <DatePicker
            {...field}
            value={field.value ? dayjs(field.value) : null}
            format={format}
            className={classNames(error ? `error` : `focus hover`, className)}
            size={size}
            onChange={(date, dateString) => {
              field.onChange(date ? date.valueOf() : null);
            }}
          />
          <ValidateError error={error} />
        </Fragment>
      )}
    />
  );
};

export default AntdDatePicker;
