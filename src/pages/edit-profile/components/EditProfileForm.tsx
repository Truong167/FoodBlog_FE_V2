
import DefaultLayout from '../../../components/layout/DefaultLayout/DefaultLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from 'antd'
import Section from '../../../components/Section/Section'
import AntdUpload from '../../../components/UI/Upload'
import FormItem from '../../../components/UI/FormItem'
import InputText from '../../../components/UI/Input/Input'
import AntdDatePicker from '../../../components/UI/DatePicker'
import { DATE_NORMAL } from '../../../contants/date-format'
import AntdTextArea from '../../../components/UI/Input/TextArea'
import { useEditProfile } from '../hooks/useEditProfile'

const EditProfileForm = (user: any) => {
    const {handleSubmit, onSubmit, control} = useEditProfile(user.user)


    return (
        <DefaultLayout className="width1" type='edit' text='Cập nhật'>
            <Section>
                <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <div className='flex justify-center h-40'>
                        <FormItem>
                            <AntdUpload
                                className='h-80 w-80'
                                control={control}

                                name='avatar'
                                listType='picture-circle'
                            />
                        </FormItem>
                    </div>
                    <FormItem label='Họ và tên'>
                        <InputText
                            name='fullName'
                            control={control}
                        />
                    </FormItem>
                    <FormItem label='Giới thiệu bản thân'>
                        <InputText
                            name='fullName'
                            control={control}
                        />
                    </FormItem>
                    <FormItem label='Ngày sinh'>
                        <AntdDatePicker
                            className='w-full'
                            format={DATE_NORMAL}
                            name='fullName'
                            control={control}
                        />
                    </FormItem>
                    <FormItem label='Email'>
                        <InputText
                            name='fullName'
                            control={control}
                        />
                    </FormItem>
                    <FormItem label='Địa chỉ'>
                        <AntdTextArea
                            autoSize={true}
                            name='fullName'
                            control={control}
                        />
                    </FormItem>
                </Form>
            </Section>
        </DefaultLayout>
    )
}

export default EditProfileForm
