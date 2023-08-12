import { SubmitHandler, useForm } from "react-hook-form";
import {
  useAddRecipe,
  useUpdateRecipe,
} from "../../../../../services/Recipe/service";
import { Steps, notification } from "antd";
import { imageUrl } from "../../../../../contants/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateRecipe } from "../../../../../utils/validateRecipe";
import { useQueryClient } from "@tanstack/react-query";
import { sumObjects } from "../../../../../utils/sumObject";

export const useSubmit = (
  data: Partial<Recipe.TRecipeDetailResponse>,
  recipeId: string
) => {
  const { mutate, isLoading } = useUpdateRecipe();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<any>({
    resolver: yupResolver(validateRecipe),
    shouldFocusError: false,
    defaultValues: {
      ...data,
      image: data.image ? [{url: data.image}] : null,
      video: data.video ? [{url: data.video}] : null,
      Steps: data.Steps?.map((item) => {
        return {
          ...item,
          image: item.image ? [{url: item.image}] : null,
        };
      }),
    },
    mode: "all",
  });


  const onSubmit: SubmitHandler<Recipe.TRecipeParams> = (values) => {
    const DetailIngredients = sumObjects(values.DetailIngredients)
    const validateDate = {
      ...values,
      video: values.video[0].hasOwnProperty("response")
        ? values.video[0].response
        : values.video[0].url,
      image: values.image[0].hasOwnProperty("response")
        ? values.image[0].response
        : values.image[0].url,
      Steps: values.Steps.map((item, index) => {
        return {
          ...item,
          stepIndex: index + 1,
          image:
            item.image && Array.isArray(item.image) && item.image.length > 0 
              ? item.image[0].hasOwnProperty("response") ? item.image[0].response : item.image[0].url
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
      console.log(validateDate)
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
                message: "Cập nhật công thức thành công",
              });
              queryClient.invalidateQueries(["singleRecipe", recipeId]);
              break;
            case 418:
              notification.warning({
                message: "Vui lòng điền đầy đủ thông tin",
              });
              break;
            case 432:
              notification.warning({
                message: "Công thức không tồn tại",
              });
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
