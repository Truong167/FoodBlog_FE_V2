import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateUser } from "../../../services/Auth/service";
import { notification } from "antd";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const useEditProfile = (data: AUTH.TUser) => {
    const userValidattionSchema = object({
        fullName: string().required('Vui lòng nhập họ và tên'),
        email: string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
    })
  const { control, handleSubmit, setError } = useForm<any>({
    resolver: yupResolver(userValidattionSchema),
    defaultValues: {
      ...data,
      avatar: data.avatar ? [{url: data.avatar}] : undefined,
    },
    mode: 'all'
  });

  const {mutate, isLoading} = useUpdateUser()

  const onSubmit: SubmitHandler<AUTH.TUser> = (values) => {
    const validateDate = {
      ...values,
      avatar: values.avatar && Array.isArray(values.avatar) && values.avatar.length > 0 
      ? values.avatar[0].hasOwnProperty("response") ? values.avatar[0].response : values.avatar[0].url
      : null,
    };

    mutate(validateDate,{
        onSuccess: (data) => {
            switch(data.status){
                case 200: 
                    notification.success({
                        message: 'Cập nhật thông tin thành công'
                    })
                    break
                case 418:
                    notification.warning({
                        message: 'Vui lòng nhập đầy đủ thông tin'
                    })
                    break
                case 422:
                    notification.warning({
                        message: 'Email đã tồn tại'
                    })
                    setError('email', {message: 'Email đã tồn tại'})
                    break
                case 400:
                    notification.warning({
                        message: 'Người dùng không tồn tại'
                    })
                    break
                default:
                    break
            }
        }
    })
  };

  return { control, handleSubmit, onSubmit, isLoading };
};
