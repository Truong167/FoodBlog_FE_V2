import { Checkbox, DatePicker } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

import ValidateError from '../ValidateError';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const AntdCheckbox: React.FC<Recipe.TPropsForm> = ({
  control,
  name,
  className,
  size,
  defaultChecked,
  value
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Fragment>
            <Checkbox
            {...field}
            defaultChecked={defaultChecked}
            onChange={(e) => {
              field.onChange(e.target.checked)
            }}
            >
              {value}
            </Checkbox>
          </Fragment>
        )}
      }
    />
  )
};

export default AntdCheckbox;
