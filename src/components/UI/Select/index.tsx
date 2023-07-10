import { Select } from 'antd';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

const { Option } = Select;

const AntdSelect: React.FC<Recipe.TSelect> = ({ control, name, values, size, className, defaultValue }) => {
  const classCustom = `ant-select ${className}`;
  return (
    <Fragment>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select {...field} size={size} className={classCustom} defaultValue={defaultValue}>
            {values.map((item: { id: string | number; name: string | number }) => (
              <Option key={item.name} values={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        )}
      />
    </Fragment>
  );
};

export default AntdSelect;