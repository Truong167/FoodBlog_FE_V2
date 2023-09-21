import { FormInstance, notification } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdatePrivacy } from "../../../../../../services/Recipe/service";
import { useQueryClient } from "@tanstack/react-query";
import { useIngredientName } from "../../../../../../services/Ingredient/service";

const useSubmit = (
  recipeId: number,
  status: string,
  form: FormInstance,
  setIsPrivacyModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<any>({
    defaultValues: {
      status: status,
    },
  });
  const {data: ingredientName} = useIngredientName()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useUpdatePrivacy();

  const handleConfirm = () => {
    form.submit();
  };

  const onSubmit: SubmitHandler<Recipe.TStatus> = (values) => {
    mutate(
      {
        params: {
          recipeId,
          body: values,
        },
      },
      {
        onSuccess: (data) => {
          if (data.status === 200) {
            notification.success({
              message: "Thay đổi trạng thái thành công",
            });
            queryClient.invalidateQueries([
              "recipeByIngredient",
              ingredientName,
            ]);
            queryClient.invalidateQueries(["myRecipe"]);
            queryClient.invalidateQueries(["recipePopular"]);
            queryClient.invalidateQueries(["recipeFollow"]);
            queryClient.invalidateQueries(["searchResultRecipe"]);
            queryClient.invalidateQueries(["recipeFavorite"]);
          }
          setIsPrivacyModalOpen(false);
        },
        onError: (error) => {},
      }
    );
  };

  return {
    reset,
    control,
    onSubmit,
    handleSubmit,
    isLoading,
    handleConfirm,
  };
};

export default useSubmit;
