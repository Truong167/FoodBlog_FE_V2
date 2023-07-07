'use client';

import { Button, Form, Input } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useLogin } from '../../../services/Auth/service';

interface ILoginFormInput {
  accountName: string;
  password: string;
}

const LoginForm: React.FC = () => {
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

  const { isLoading, mutate } = useLogin();


  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<ILoginFormInput> = async (values: API_AUTH.LoginParams) => {
    mutate(values, {
      onSuccess: (data: API_AUTH.LoginResult) => {
        console.log(data)
        if (data?.status === 200) {
          queryClient.setQueryData(['isAuthenticated'], true)
        }
      },

      onError: (errors) => {
        console.log(errors)
      },
    });
  };

  return (
    <div>
      <Form
        layout="vertical"
        name="normal_login"
        onFinish={handleSubmit(onSubmit)}
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
            <p className="text-amber-700 mb-0 float-left">
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
            <p className="text-amber-700 mb-0 float-left" role="alert">
              Mật khẩu không được trống
            </p>
          )}
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType="submit" className='bg-blue-700' loading={isLoading}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <p style={{ color: "white" }}>
        Bạn chưa có tài khoản?
        <Link to='/register' className='ml-3 text-blue-700'>
          Đăng ký
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
