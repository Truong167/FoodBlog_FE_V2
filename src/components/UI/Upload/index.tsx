import { Button, Input, Upload, message, notification } from 'antd';
import React, { Fragment, useState } from 'react';
import { Controller } from 'react-hook-form';
import ValidateError from '../ValidateError';
import { RcFile, UploadFile } from 'antd/es/upload';


const AntdUpload: React.FC<Recipe.TPropsForm> = ({ control, name, error }) => {
    const [fileSelected, setFileSelected] = useState(false);
    const className = error.hasOwnProperty(name) ? `btn-danger-outlined` : `btn-outlined `;

    const beforeUpload = (file: { type: string; name: any }) => {
        const isImage = file.type.includes('image');
        if (!isImage) {
            notification.error({
                message: `${file.name} is not a image file`
            });
        }
        return isImage || Upload.LIST_IGNORE;
    };

    const customRequest = (options: any) => {
        const {onSuccess, file} = options
        onSuccess(file)
    }

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };


    return (
        <Fragment>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <Upload
                            customRequest={customRequest}
                            className={className}
                            {...field}
                            maxCount={1}
                            listType="picture-card"
                            fileList={field.value}
                            onChange={(info) => {
                                field.onChange(info.fileList);
                                setFileSelected(info.fileList.length > 0);
                            }}
                            onPreview={onPreview}
                            beforeUpload={beforeUpload}
                        >
                            {!fileSelected && 'Upload'}
                        </Upload>
                    );
                }}
            />
            <ValidateError name={name} error={error} />
        </Fragment>
    );

};

export default AntdUpload;