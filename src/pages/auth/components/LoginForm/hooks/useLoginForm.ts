import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../../../../../services/Auth/service";
import {object, string} from 'yup'
import { notification } from "antd";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../../../../contants/constant";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

export const useLoginForm = () => {
    const { isLoading, mutate } = useLogin();
    const loginValidattionSchema = object({
        accountName: string().required('Vui lòng nhập tên tài khoản'),
        password: string().required('Vui lòng nhập mật khẩu')
    })
    const {
        control,
        handleSubmit,
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
                } 
                else {
                    notification.error({
                        message: `Sai mật khẩu: ${data.message}`
                    })
                }
            },

            onError: (errors: any) => {
                notification.error({
                    message: errors
                })
            },
        });
    };

    return { control, handleSubmit, onSubmit, isLoading }
}