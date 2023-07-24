import { Button, Upload, notification } from 'antd';
import React, { Fragment, useState } from 'react';
import { Controller } from 'react-hook-form';
import ValidateError from '../../ValidateError';
import ReactPlayer from 'react-player';
import { useDelete, useUpload } from '../../../../services/Media/service';



const AntdUploadVideo: React.FC<Recipe.TPropsForm> = ({ control, name, listType, className }) => {
    const checkIsHaveFile = control._defaultValues[name] ? true : false;
    const [isHaveFile, setIsHaveFile] = useState(checkIsHaveFile);
    const [videoSrc, setVideoSrc] = useState(checkIsHaveFile ? control._defaultValues[name][0].url : '');
    const { mutate } = useUpload()
    const { mutate: deleteFile } = useDelete()
    const beforeUpload = (file: { type: string; name: any }) => {
        const isVideo = file.type.includes('video/mp4');
        if (!isVideo) {
            notification.error({
                message: `${file.name} không phải là video`
            });
        }
        return isVideo || Upload.LIST_IGNORE;
    };
    const customRequest = (options: any) => {
        const { onSuccess, file } = options
        const fmData = new FormData();
        fmData.append('file', file);
        mutate(fmData, {
            onSuccess: (response) => {
                onSuccess(response.data.data)
                setIsHaveFile(true)
            }
        })
    }

    const handleOnRemove = (value: any) => {
        const fileName = value[0].response
        deleteFile(fileName, {
            onSuccess: () => {
                setVideoSrc('')
                setIsHaveFile(false)
            }
        })
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <Fragment>
                        {isHaveFile ?
                            <div className='h-full w-full'>
                                <ReactPlayer width='100%' height='100%' url={videoSrc} controls={true} />
                                <Button className='btn-outlined mt-3' onClick={() => {
                                    handleOnRemove(field.value)
                                    field.onChange([])
                                }}>Xóa video</Button>
                            </div>
                            :
                            <Upload
                                customRequest={customRequest}
                                className={className}
                                {...field}
                                showUploadList={false}
                                maxCount={1}
                                listType={listType}
                                fileList={field.value}
                                onChange={(info: any) => {
                                    field.onChange(info.fileList);
                                    setVideoSrc(URL.createObjectURL(info.file.originFileObj))
                                }}
                                beforeUpload={beforeUpload}
                            >
                                {!isHaveFile && <Button className='btn-outlined'>Tải video</Button>}
                            </Upload>
                        }
                        <ValidateError error={error} />
                    </Fragment>
                );
            }}
        />
    )
};

export default AntdUploadVideo;