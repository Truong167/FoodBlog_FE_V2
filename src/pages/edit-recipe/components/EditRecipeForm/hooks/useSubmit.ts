import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateRecipe } from "../../../../../services/Recipe/service";
import { notification } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateRecipe } from "../../../../../(utils)/validateRecipe";
import { useQueryClient } from "@tanstack/react-query";
import { sumObjects } from "../../../../../(utils)/sumObject";
import { useNavigate } from "react-router-dom";
import errorCode from "../../../../../contants/error-code";

export const useSubmit = (
  data: Partial<Recipe.TRecipeDetailResponse>,
  recipeId: string
) => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useUpdateRecipe();
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<any>({
    resolver: yupResolver(validateRecipe),
    shouldFocusError: false,
    defaultValues: {
      ...data,
      image: data.image ? [{ url: data.image }] : null,
      video: data.video ? [{ url: data.video }] : null,
      Steps: data.Steps?.map((item) => {
        return {
          ...item,
          image: item.image ? [{ url: item.image }] : null,
        };
      }),
    },
    mode: "all",
  });

  const onSubmit: SubmitHandler<Recipe.TRecipeParams> = (values) => {
    const DetailIngredients = sumObjects(values.DetailIngredients);
    const validateDate = {
      ...values,
      video:
        values.video && Array.isArray(values.video) && values.video.length > 0
          ? values.video[0].hasOwnProperty("response")
            ? values.video[0].response
            : values.video[0].url
          : null,
      image: values.image[0].hasOwnProperty("response")
        ? values.image[0].response
        : values.image[0].url,
      Steps: values.Steps.map((item, index) => {
        return {
          ...item,
          stepIndex: index + 1,
          image:
            item.image && Array.isArray(item.image) && item.image.length > 0
              ? item.image[0].hasOwnProperty("response")
                ? item.image[0].response
                : item.image[0].url
              : null,
        };
      }),
      DetailIngredients: DetailIngredients?.map((item) => {
        return {
          ...item,
          amount: item.amount + " " + item.unit,
        };
      }),
    };
    mutate(
      {
        params: {
          recipeId: recipeId,
          body: validateDate,
        },
      },
      {
        onSuccess: (data) => {
          switch (data.status) {
            case 200:
              notification.success({
                message: errorCode.UPDATE_RECIPE_SUCCESS,
              });
              queryClient.invalidateQueries(["singleRecipe", recipeId]);
              navigate("/");
              break;
            default:
              break;
          }
        },
      }
    );
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
  };
};
