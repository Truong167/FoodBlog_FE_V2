import { Button, Input, Upload, message } from 'antd';
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
            message.error(`${file.name} is not a image file`);
        }
        return isImage || Upload.LIST_IGNORE;
    };

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
                            {...field}
                            action=''
                            listType="picture-card"
                            fileList={field.value}
                            onChange={(info) => {
                                field.onChange(info.fileList.slice(-1));
                                setFileSelected(info.fileList.length > 0);
                            }}
                            onRemove={() => {
                                setFileSelected(false);
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