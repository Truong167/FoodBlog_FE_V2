import { Radio, Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { Fragment, ReactNode } from 'react';
import { Controller } from 'react-hook-form';

type TRadio = {
    size?: SizeType
    control: any;
    name: string;
    className?: string;
    defaultValue?: string
    showSearch?: boolean
    options: string[] | number[] | Array<{ label: ReactNode; value: string; disabled?: boolean; }> 
}

const AntdRadio: React.FC<TRadio> = ({ control, name, className, options, size }) => {
    return (
        <Fragment>
            <Controller
                control={control}
                name={name}
                render={({ field }) => {
                    return (
                        <Radio.Group
                            buttonStyle='solid'
                            defaultValue={control._defaultValues[name]}
                            size={size}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className={className}
                            options={options}
                        >
                        </Radio.Group>
                    )
                }}
            />
        </Fragment>
    );
};

export default AntdRadio;
