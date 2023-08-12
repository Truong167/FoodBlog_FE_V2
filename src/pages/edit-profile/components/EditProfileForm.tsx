
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

const EditProfileForm = ({ user }: { user: AUTH.TUser }) => {
    const { handleSubmit, onSubmit, control, isLoading } = useEditProfile(user)
    const [form] = Form.useForm()

    return (
        <DefaultLayout className="width1" type='edit' text='Cập nhật' form={form} isLoading={isLoading}>
            <Section>
                <Form form={form} layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <FormItem className='flex justify-center mt-3 h-[150px]'>
                        <AntdUpload
                            control={control}
                            name='avatar'
                            listType='picture-circle'
                        />
                    </FormItem>
                    <FormItem label='Họ và tên'>
                        <InputText
                            name='fullName'
                            control={control}
                        />
                    </FormItem>
                    <FormItem label='Giới thiệu bản thân'>
                        <InputText
                            name='introduce'
                            control={control}
                        />
                    </FormItem>
                    <FormItem label='Ngày sinh'>
                        <AntdDatePicker
                            className='w-full'
                            format={DATE_NORMAL}
                            name='dateOfBirth'
                            control={control}
                        />
                    </FormItem>
                    <FormItem label='Email'>
                        <InputText
                            name='email'
                            control={control}
                        />
                    </FormItem>
                    <FormItem label='Địa chỉ'>
                        <AntdTextArea
                            autoSize={true}
                            name='address'
                            control={control}
                        />
                    </FormItem>
                </Form>
            </Section>
        </DefaultLayout>
    )
}

export default EditProfileForm
