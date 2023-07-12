import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import InputText from '../../../../components/UI/Input/Input';
import InputPassword from '../../../../components/UI/Input/InputPassword';
import { useLoginForm } from './hooks/useLoginForm';


const LoginForm: React.FC = () => {
  const {handleSubmit, onSubmit, control, errors, isLoading} = useLoginForm()

  return (
    <div>
      <Form
        layout="vertical"
        name="normal_login"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item label={<span style={{ color: 'white' }}>Tên đăng nhập</span>} className="mb-3">
          <InputText
            name='accountName'
            control={control}
            error={errors}
            placeholder='Tên tài khoản'
            size='large'
          />
        </Form.Item>
        <Form.Item label={<span style={{ color: 'white' }}>Mật khẩu</span>}>
          <InputPassword
            name='password'
            control={control}
            error={errors}
            placeholder='Mật khẩu'
            size='large'
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType="submit" className='bg-primary-1' loading={isLoading}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <p style={{ color: "white" }}>
        Bạn chưa có tài khoản?
        <Link to='/register' className='ml-3 text-primary-1'>
          Đăng ký
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
