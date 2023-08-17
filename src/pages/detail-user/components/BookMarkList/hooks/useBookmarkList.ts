import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateRecipeList } from "../../../../../services/RecipeList/service";
import { useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

const useBookmarkList = () => {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const { control, handleSubmit, setFocus, setError, clearErrors, resetField } =
    useForm<Recipe_List.TCreateRecipeList>();
  const { mutate, isLoading } = useCreateRecipeList();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<Recipe_List.TCreateRecipeList> = (values) => {
    if (!values.name) {
      setError("name", { message: "Vui lòng nhập tên danh sách công thức" });
      setFocus("name");
      return
    }

    const validateData = values.name ? values.name.replace(/\s+/g, " ") : undefined

    mutate(
      {
        name: validateData,
      },
      {
        onSuccess: (data) => {
          if (data.status === 200) {
            notification.success({
              message: "Thêm danh sách công thức thành công",
            });
            queryClient.invalidateQueries(["recipeList"]);
            resetField("name");
            setIsCreate(false);
          } else if (data.status === 418) {
            notification.error({
              message: "Vui lòng nhập tên danh sách",
            });
            setError("name", { message: "Vui lòng nhập tên danh sách công thức" });
            setFocus("name");
          }
        },
      }
    );
  };

  return {
    control,
    handleSubmit,
    isCreate,
    setIsCreate,
    onSubmit,
    clearErrors,
    isLoading,
  };
};

export default useBookmarkList;
