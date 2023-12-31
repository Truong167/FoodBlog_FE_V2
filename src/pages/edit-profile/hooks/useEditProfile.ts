import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateUser } from "../../../services/Auth/service";
import { notification } from "antd";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from 'dayjs';
import errorCode from "../../../contants/error-code";

export const useEditProfile = (data: AUTH.TUser) => {
  const userValidattionSchema = object({
    fullName: string().required(errorCode.FULL_NAME_BLANK_ERROR),
    introduce: string().required(errorCode.INTRODUCE_BLANK_ERROR),
    dateOfBirth: string().required(errorCode.DATEOFBIRTH_BLANK_ERROR),
    email: string()
      .email(errorCode.EMAIL_FORMAT_ERROR)
      .required(errorCode.EMAIL_BLANK_ERROR),
    address: string().required(errorCode.ADDRESS_BLANK_ERROR),
  });
  const { control, handleSubmit, setError, formState: {dirtyFields} } = useForm<any>({
    resolver: yupResolver(userValidattionSchema),
    defaultValues: {
      ...data,
      avatar: data.avatar ? [{ url: data.avatar }] : undefined,
    },
    mode: "all",
  });

  const { mutate, isLoading } = useUpdateUser();

  const convertToISOString = (values: number | string | undefined) => {
    if(typeof values === 'string') {
      return dayjs(parseInt(values)).toISOString()
    } else if(typeof values === 'number') {
      return dayjs(values).toISOString()
    }

    return undefined
  }

  const onSubmit: SubmitHandler<AUTH.TUser> = (values) => {
   console.log(convertToISOString(values.dateOfBirth), values)
    const validateDate = {
      ...values,
      dateOfBirth: dirtyFields.dateOfBirth ? convertToISOString(values.dateOfBirth) : undefined,
      avatar:
        values.avatar &&
        Array.isArray(values.avatar) &&
        values.avatar.length > 0
          ? values.avatar[0].hasOwnProperty("response")
            ? values.avatar[0].response
            : values.avatar[0].url
          : null,
    };

    mutate(validateDate, {
      onSuccess: (data) => {
        switch (data.status) {
          case 200:
            notification.success({
              message: errorCode.UPDATE_PROFILE_SUCCESS,
            });
            break;
          case 422:
            notification.warning({
              message: errorCode.EMAIL_UNIQUE_ERROR,
            });
            setError("email", { message: errorCode.EMAIL_UNIQUE_ERROR });
            break;
          default:
            break;
        }
      },
    });
  };

  return { control, handleSubmit, onSubmit, isLoading };
};
