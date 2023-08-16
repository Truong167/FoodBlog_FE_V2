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
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { mutate } = useUpload()
    const beforeUpload = (file: { type: string; name: any; size: number }) => {
        const isVideo = file.type.includes('video/mp4');
        if (!isVideo) {
            notification.error({
                message: `${file.name} không phải là video`
            });
        }
        const isLimitFileSize = file.size / 1024 / 1024 < 100;
        if (!isLimitFileSize) {
            notification.error({
                message: `Vui lòng gửi file nhỏ hơn 100MB`
            });
        }

        return (isVideo && isLimitFileSize) || Upload.LIST_IGNORE;
    };
    const customRequest = (options: any) => {
        setIsLoading(true)
        const { onSuccess, file } = options
        const fmData = new FormData();
        fmData.append('file', file);
        console.log('lallal')
        mutate(fmData, {
            onSuccess: (response) => {
                if (response.data.success) {
                    onSuccess(response.data.data)
                    setIsHaveFile(true)
                } else {
                    notification.error({
                        message: 'Có lỗi khi tải video'
                    })
                }
                setIsLoading(false)
                console.log(response)
            }
        })
    }

    const handleOnRemove = () => {
        setVideoSrc('')
        setIsHaveFile(false)
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                console.log(field.value)
                return (
                    <Fragment>
                        {isHaveFile ?
                            <div className='h-full w-full'>
                                <ReactPlayer width='100%' height='100%' url={videoSrc} controls={true} volume={0.5} />
                                <Button className='btn-outlined mt-3' onClick={() => {
                                    handleOnRemove()
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
                                {!isHaveFile && <Button loading={isLoading} className='btn-outlined'>Tải video</Button>}
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