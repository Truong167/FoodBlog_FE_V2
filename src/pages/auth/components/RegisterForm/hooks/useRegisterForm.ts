import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { useRegister } from "../../../../../services/Auth/service";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import ERROR_CODE from "../../../../../contants/error-code";

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const registerValidattionSchema = object({
    fullName: string().required(ERROR_CODE.FULL_NAME_BLANK_ERROR),
    email: string()
      .email(ERROR_CODE.EMAIL_FORMAT_ERROR)
      .required(ERROR_CODE.EMAIL_BLANK_ERROR),
    accountName: string().required(ERROR_CODE.ACCOUNT_BLANK_ERROR),
    password: string().required(ERROR_CODE.PASSWORD_BLANK_ERROR),
    password2: string().required(ERROR_CODE.CONFIRM_PASSWORD_BLANK_ERROR),
  });
  const { control, handleSubmit, setError } = useForm<AUTH.TRegisterParams>({
    resolver: yupResolver(registerValidattionSchema),
    defaultValues: {
      fullName: "",
      email: "",
      accountName: "",
      password: "",
      password2: "",
    },
  });

  const { isLoading, mutate } = useRegister();

  const onSubmit: SubmitHandler<AUTH.TRegisterParams> = async (
    values: AUTH.TRegisterParams
  ) => {
    mutate(values, {
      onSuccess: (data: AUTH.TLoginResult) => {
        switch (data.status) {
          case 201:
            notification.success({
              message: ERROR_CODE.SUCCESS_REGISTER,
            });
            navigate("/");
            break;
          case 418:
            notification.error({
              message: data.data?.message
            })
            break
          case 422:
            notification.error({
              message: ERROR_CODE.EMAIL_UNIQUE_ERROR,
            });
            setError("email", { message: ERROR_CODE.EMAIL_UNIQUE_ERROR });
            break;
          case 423:
            notification.error({
              message: ERROR_CODE.ACCOUNT_UNIQUE_ERROR,
            });
            setError("accountName", { message: ERROR_CODE.ACCOUNT_UNIQUE_ERROR });
            break;
          case 419:
            notification.success({
              message: ERROR_CODE.MATCH_PASSWORD_ERROR,
            });
            break;
          case 420:
            notification.success({
              message: ERROR_CODE.PASSWORD_FORMAT_ERROR,
            });
            break;
          default:
            break;
        }
      },

      onError: (errors: any) => {
        notification.error({
          message: errors,
        });
      },
    });
  };
  return { control, handleSubmit, onSubmit, isLoading };
};
