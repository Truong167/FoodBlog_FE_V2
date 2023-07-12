import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { useLogin } from "../../../../../services/Auth/service";
import { useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../../../../utils/constant";
import axios from "axios";

export const useLoginForm = () => {
    const { isLoading, mutate } = useLogin();
    const loginValidattionSchema = object({
        accountName: string().required('Vui lòng nhập tên tài khoản'),
        password: string().required('Vui lòng nhập mật khẩu')
    })
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AUTH.TLoginParams>({
        resolver: yupResolver(loginValidattionSchema),
        defaultValues: {
            accountName: '',
            password: '',
        },
        mode: 'all'
    });

    const queryClient = useQueryClient()
    const onSubmit: SubmitHandler<AUTH.TLoginParams> = async (values: AUTH.TLoginParams) => {
        mutate(values, {
            onSuccess: (data: AUTH.TLoginResult) => {
                console.log(data)
                if (data?.status === 200) {
                    notification.success({
                        message: 'Đăng nhập thành công'
                    })
                    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
                    if (token) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    }
                    queryClient.setQueryData(['isAuthenticated'], true)
                } else if(data.status === 424) {
                    notification.error({
                        message: 'Tài khoản không tồn tại'
                    })
                } else {
                    notification.error({
                        message: 'Sai mật khẩu'
                    })
                }
            },

            onError: (errors) => {
                console.log(errors)
            },
        });
    };

    return { control, errors, handleSubmit, onSubmit, isLoading }
}