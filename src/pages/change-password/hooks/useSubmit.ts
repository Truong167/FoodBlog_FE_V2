import { SubmitHandler, useForm } from "react-hook-form";
import { notification } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useChangePassword } from "../../../services/Auth/service";
import { object, string } from "yup";
import errorCode from "../../../contants/error-code";

const validateChangePassword = object({
  oldPassword: string().required("Vui lòng nhập mật khẩu cũ"),
  newPassword: string()
    .required("Vui lòng nhập mật khẩu mới")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,}$/, "Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt"),
  checkPassword: string()
    .required('Vui lòng xác nhận mật khẩu')
});

export const useSubmit = () => {
  const { control, handleSubmit } = useForm<any>({
    resolver: yupResolver(validateChangePassword),
    shouldFocusError: false,
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      checkPassword: "",
    },
    mode: "all",
  });

  const { mutate, isLoading } = useChangePassword();

  const onSubmit: SubmitHandler<AUTH.TChangePasswordParams> = (values) => {
    mutate(values, {
       onSuccess: (data) => {
        console.log(data)
        if(data.status === 200) {
            notification.success({
                message: errorCode.CHANGE_PASSWORD_SUCCESS
            })
        } else if(data.status === 425) {
            notification.error({
                message: data.data.message
            })
        } else if(data.status === 419) {
            notification.error({
                message: errorCode.MATCH_PASSWORD_ERROR
            })
        }
       } 
    })
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
  };
};
