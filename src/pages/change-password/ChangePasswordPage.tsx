import { Button, Form } from "antd";
import DefaultLayout from "../../components/layout/DefaultLayout/DefaultLayout";
import { useSubmit } from "./hooks/useSubmit";
import Section from "../../components/Section/Section";
import FormItem from "../../components/UI/FormItem";
import InputText from "../../components/UI/Input/Input";
import InputPassword from "../../components/UI/Input/InputPassword";

export const ChangePasswordPage = () => {
    const { control, handleSubmit, onSubmit, isLoading } = useSubmit()
    const [form] = Form.useForm();

    return (
        <DefaultLayout className="width1"  isLoading={isLoading}>
            <Section>
                <Form form={form} onFinish={handleSubmit(onSubmit)}>
                    <h4 className="text-center">Đổi mật khẩu</h4>
                    <div className='grid grid-cols-2 mt-6'>
                        <p className="text-neutral-2">Mật khẩu cũ</p>
                        <FormItem>
                            <InputText
                                control={control}
                                name="oldPassword"
                                size='large'
                            />
                        </FormItem>
                    </div>
                    <div className='grid grid-cols-2 mt-6'>
                        <p className="text-neutral-2">Mật khẩu mới</p>
                        <FormItem>
                            <InputPassword
                                control={control}
                                name="newPassword"
                                size='large'
                            />
                        </FormItem>
                    </div>
                    <div className='grid grid-cols-2 mt-6'>
                        <p className="text-neutral-2">Xác nhận mật khẩu</p>
                        <FormItem>
                            <InputPassword
                                control={control}
                                name="checkPassword"
                                size='large'
                            />
                        </FormItem>
                    </div>
                    <div className="flex justify-center">
                        <Button loading={isLoading} htmlType="submit" className='bg-primary-1 text-white btn-filled'>Xác nhận</Button>
                    </div>
                </Form>
            </Section>
        </DefaultLayout>
    )
}