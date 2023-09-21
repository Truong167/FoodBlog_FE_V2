import { Upload, notification } from 'antd';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import ValidateError from '../ValidateError';
import { useDelete, useUpload } from '../../../services/Media/service';


const AntdUpload: React.FC<Recipe.TPropsForm> = ({ control, name, listType, className }) => {
    const { mutate } = useUpload()
    const { mutate: deleteFile } = useDelete()
    const beforeUpload = (file: { type: string; name: any }) => {
        const isImage = file.type.includes('image');
        if (!isImage) {
            notification.error({
                message: `${file.name} không phải là hình`
            });
        }
        return isImage || Upload.LIST_IGNORE;
    };

    const customRequest = (options: any) => {
        const { onSuccess, file } = options
        const fmData = new FormData();
        fmData.append('file', file);

        mutate(fmData, {
            onSuccess: (response) => {
                onSuccess(response.data.data)
            }
        })
    }

    const onRemove = (info: any) => {
        if(info.response){
            deleteFile(info.response)
        }
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <Fragment>
                        <Upload
                            customRequest={customRequest}
                            className={className}
                            {...field}
                            maxCount={1}
                            listType={listType}
                            fileList={field.value}
                            onChange={(info) => {
                                field.onChange(info.fileList);
                            }}
                            beforeUpload={beforeUpload}
                            onRemove={onRemove}
                        >
                            {(!field.value || (Array.isArray(field.value) && field.value.length === 0)) && 'Tải hình'}
                        </Upload>
                        <ValidateError error={error} />
                    </Fragment>
                );
            }}
        />
    );

};

export default AntdUpload;