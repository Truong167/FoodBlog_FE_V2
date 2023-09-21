import { Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import InputText from '../../../../components/UI/Input/Input';
import InputPassword from '../../../../components/UI/Input/InputPassword';
import { useRegisterForm } from './hooks/useRegisterForm';


const RegisterForm = () => {
  const { control, handleSubmit, onSubmit, isLoading } = useRegisterForm()

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item label={<span style={{ color: 'white' }}>Họ và tên</span>} className="mb-3">
          <InputText
            name='fullName'
            size='large'
            control={control}
            placeholder='Họ và tên'
          />
        </Form.Item>
        <Form.Item label={<span style={{ color: 'white' }}>Email</span>} className="mb-3">
          <InputText
            name='email'
            size='large'
            control={control}
            placeholder='Email'
          />
        </Form.Item>

        <Form.Item label={<span style={{ color: 'white' }}>Tên tài khoản</span>} className="mb-3">
          <InputText
            name='accountName'
            size='large'
            control={control}
            placeholder='Tên tài khoản'
          />
        </Form.Item>

        <Form.Item label={<span style={{ color: 'white' }}>Mật khẩu</span>} className="mb-3">
          <InputPassword
            name='password'
            size='large'
            control={control}
            placeholder='Mật khẩu'
          />
        </Form.Item>

        <Form.Item label={<span style={{ color: 'white' }}>Xác nhận mật khẩu</span>}>
          <InputPassword
            name='password2'
            size='large'
            control={control}
            placeholder='Xác nhận mật khẩu'
          />
        </Form.Item>

        <Form.Item className='landing-inner'>
          <Button type='primary' className='text-white bg-primary-1' htmlType="submit" loading={isLoading}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      <p style={{ color: "white" }} className='landing-inner'>
        Bạn đã có tài khoản?
        <Link to='/login' className='ml-3 text-primary-1 underline-offset-4'>
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;