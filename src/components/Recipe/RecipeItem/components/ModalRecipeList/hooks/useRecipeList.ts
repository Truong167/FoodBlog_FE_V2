import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { useCreateRecipeList, useCreateRecipeToBookMark } from "../../../../../../services/RecipeList/service";
import { notification } from "antd";
import { useQueryClient } from "@tanstack/react-query";

type RecipeListDetail = {
  recipeListId: number, 
  name: string, 
  isBookmarked: boolean
}

const useRecipeList = (
  recipeListDetail:
    | { recipeListId: number; name: string; isBookmarked: boolean }[]
    | string,
  recipeId: number,
  setIsRecipeListModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { control, handleSubmit } = useForm<any>({
    defaultValues: {
      recipeListDetail: recipeListDetail,
    },
  });

  const { control: controlRecipeList, handleSubmit: handleSubmitRecipeList, formState: { errors }, setError, setFocus, resetField } =
    useForm({
      defaultValues: {
        name: "",
      },
    });

  const queryClient = useQueryClient();


  const { mutate, isLoading } = useCreateRecipeToBookMark();
  const { mutate: mutateRecipeList, isLoading: isLoadingRecipeList } = useCreateRecipeList();

  const { fields, append } = useFieldArray({
    control,
    name: "recipeListDetail",
  });

  const onSubmit: SubmitHandler<any> = (values) => {
    const validateData = values.recipeListDetail.filter(
      (item: { recipeListId: number; name: string; isBookmarked: boolean }) =>
        item.isBookmarked
    );
    mutate(
      {
        params: {
          recipeId,
          body: validateData,
        },
      },
      {
        onSuccess: (data) => {
          if (data.status === 200) {
            notification.success({
              message: "Lưu công thức thành công",
            });
          }
          setIsRecipeListModalOpen(false);
        },
      }
    );
  };

  const onSubmitRecipeList: SubmitHandler<any> = (values) => {
    if (!values.name) {
      setError("name", { message: "Vui lòng nhập tên danh sách công thức" });
      setFocus("name");
      return;
    }

    const validateData = values.name
      ? values.name.replace(/\s+/g, " ")
      : undefined;

    mutateRecipeList(
      {
        name: validateData,
      },
      {
        onSuccess: (data) => {
          console.log(data.data.name, data.data)
          if (data.status === 200) {
            notification.success({
              message: "Thêm danh sách công thức thành công",
            });
            append({ recipeListId: data.data.data.recipeListId, name: data.data.data.name, isBookmarked: false })
            queryClient.invalidateQueries(["recipeList"]);
            resetField("name");
          } else if (data.status === 418) {
            notification.error({
              message: "Vui lòng nhập tên danh sách",
            });
            setError("name", {
              message: "Vui lòng nhập tên danh sách công thức",
            });
            setFocus("name");
          }
        },
      }
    );
  };

  return {
    control,
    fields,
    handleSubmit,
    onSubmit,
    isLoading,
    controlRecipeList,
    handleSubmitRecipeList,
    onSubmitRecipeList,
    isLoadingRecipeList
  };
};

export default useRecipeList;
