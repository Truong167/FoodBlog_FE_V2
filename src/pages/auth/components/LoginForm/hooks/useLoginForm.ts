import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../../../../../services/Auth/service";
import { object, string } from "yup";
import { notification } from "antd";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../../../../contants/constant";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import ERROR_CODE from "../../../../../contants/error-code";

export const useLoginForm = () => {
  const { isLoading, mutate } = useLogin();
  console.log(isLoading);
  const loginValidattionSchema = object({
    accountName: string().required(ERROR_CODE.ACCOUNT_BLANK_ERROR),
    password: string().required(ERROR_CODE.PASSWORD_BLANK_ERROR),
  });
  const { control, handleSubmit } = useForm<AUTH.TLoginParams>({
    resolver: yupResolver(loginValidattionSchema),
    defaultValues: {
      accountName: "",
      password: "",
    },
    mode: "all",
  });

  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<AUTH.TLoginParams> = async (
    values: AUTH.TLoginParams
  ) => {
    mutate(values, {
      onSuccess: (data: AUTH.TLoginResult) => {
        if (data?.status === 200) {
          notification.success({
            message: ERROR_CODE.SUCCESS_LOGIN,
          });
          const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
          if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          }
          queryClient.setQueryData(["isAuthenticated"], true);
        } else if (data.status === 424) {
          notification.error({
            message: ERROR_CODE.ACCOUNT_EXIST_ERROR,
          });
        } else {
          notification.error({
            message: ERROR_CODE.WRONG_PASSWORD_ERROR,
          });
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
