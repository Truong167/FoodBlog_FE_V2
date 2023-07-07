'use client';

import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface ILoginFormInput {
    accountName: string;
    password: string;
}

const RegisterForm = () => {
  const [form] = Form.useForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    defaultValues: {
      accountName: '',
      password: '',
    },
  });
//   const handleLogin = (values: FormLogin) => {
//     console.log(values);
//     history.push('/quan-ly-nhan-vien');
//   };

  return (
    <div>
        <Form
          layout="vertical"
          name="normal_login"
        //   onFinish={handleSubmit(onSubmit)}
        >
          <Form.Item label={<span style={{ color: 'white' }}>Tên đăng nhập</span>} className="mb-3">
            <Controller
              name="accountName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="required"
                  size="large"
                  placeholder='Tài khoản'
                />
              )}
            />
            {errors.accountName?.type === 'required' && (
              <p className="text-amber-700 mb-0">
                Tên tài khoản không được trống
              </p>
            )}
          </Form.Item>
          <Form.Item label={<span style={{ color: 'white' }}>Mật khẩu</span>}>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder='Mật khẩu'
                />
              )}
            />
            {errors.password?.type === 'required' && (
              <p className="text-amber-700 mb-0" role="alert">
              </p>
            )}
          </Form.Item>
  
          <Form.Item>
            <Button type='primary' className='bg-blue-700' htmlType="submit">
                Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <p style={{color: "white"}}>
            Bạn đã có tài khoản? 
            <Link to='/login' className='ml-3 text-blue-700 underline-offset-4'>
                Đăng nhập
            </Link>
        </p>
      </div>
  );
};

export default RegisterForm;