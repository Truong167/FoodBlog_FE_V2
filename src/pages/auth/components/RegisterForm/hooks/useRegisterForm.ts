import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { useRegister } from "../../../../../services/Auth/service";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export const useRegisterForm = () => {
    const navigate = useNavigate()
    const registerValidattionSchema = object({
        fullName: string().required('Vui lòng nhập họ và tên'),
        email: string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
        accountName: string().required('Vui lòng nhập tên tài khoản'),
        password: string().required('Vui lòng nhập mật khẩu'),
        password2: string().required('Vui lòng nhập xác thực mật khẩu')
    })
    const {
        control,
        handleSubmit,
        setError
    } = useForm<AUTH.TRegisterParams>({
        resolver: yupResolver(registerValidattionSchema),
        defaultValues: {
            fullName: "",
            email: "",
            accountName: "",
            password: "",
            password2: ""
        },
    });

    const {isLoading, mutate} = useRegister()

    const onSubmit: SubmitHandler<AUTH.TRegisterParams> = async (values: AUTH.TRegisterParams) => {
        mutate(values, {
            onSuccess: (data: AUTH.TLoginResult) => {
                if (data?.status === 201) {
                    notification.success({
                        message: 'Đăng kí thành công'
                    })
                    navigate('/')
                } else if(data.status === 422) {
                    notification.error({
                        message: 'Email đã tồn tại'
                    })
                    setError('email', {message: 'Email đã tồn tại'})
                } else if(data.status === 423) {
                    notification.error({
                        message: 'Tài khoản đã tồn tại'
                    })
                    setError('accountName', {message: 'Tài khoản đã tồn tại'})
                }
                else if(data.status === 419) {
                    notification.error({
                        message: 'Mật khẩu và xác nhận mật khẩu không khớp'
                    })
                }
                else if(data.status === 420) {
                    notification.error({
                        message: 'Mật khẩu phải tối thiểu 6 kí tự bao gồm chữ hoa, chữ thường, số và kí tự đặc biệt'
                    })
                }
            },

            onError: (errors: any) => {
                notification.error({
                    message: errors
                })
            },
        })
    };
    return {control, handleSubmit, onSubmit, isLoading}
}