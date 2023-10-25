import { DatePicker } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

import ValidateError from '../ValidateError';
import { RangePickerProps } from 'antd/es/date-picker';

const AntdDatePicker: React.FC<Recipe.TPropsForm> = ({
  control,
  name,
  format,
  className,
  size,
  minAge = 18
}) => {

  console.log(dayjs().year())
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && dayjs().year() - current.year() < minAge;
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Fragment>
            <DatePicker
              {...field}
              disabledDate={disabledDate}
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
        )
      }
      }
    />
  )
};

export default AntdDatePicker;
