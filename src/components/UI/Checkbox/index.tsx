import { Checkbox } from 'antd';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

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
              className={className}
              {...field}
              defaultChecked={defaultChecked}
              onChange={(e) => {
                field.onChange(e.target.checked)
              }}
            >
              {value}
            </Checkbox>
          </Fragment>
        )
      }
      }
    />
  )
};

export default AntdCheckbox;
