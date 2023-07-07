import { Input, Upload } from 'antd';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import ValidateError from '../ValidateError';
import Dragger from 'antd/es/upload/Dragger';
import { CameraOutlined, InboxOutlined } from '@ant-design/icons';
import upload from '../../../assets/images/upload.png'


const AntdDragger: React.FC<Recipe.TPropsForm> = ({
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
                    <Upload listType='picture-card'>
                        <div className='flex justify-center'>
                            <img src={upload} alt='Upload' className='' />
                        </div>
                        <p className=''>Bạn đã đăng hình món mình nấu ở đây chưa?</p>
                        <p>Chia sẻ với mọi người thành phẩm nấu nướng của bạn nào!</p>
                    </Upload>
                )}
            />
            <ValidateError error={error} name={name} />
        </Fragment>
    );
};

export default AntdDragger;