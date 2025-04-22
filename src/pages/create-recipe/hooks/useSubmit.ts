import { SubmitHandler, useForm } from "react-hook-form";
import { useAddRecipe } from "../../../services/Recipe/service";
import { notification } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateRecipe } from "../../../(utils)/validateRecipe";
import { sumObjects } from "../../../(utils)/sumObject";
import ERROR_CODE from "../../../contants/error-code";
import { useNavigate } from "react-router-dom";

export const useSubmit = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setError, setFocus } = useForm<any>({
    resolver: yupResolver(validateRecipe),
    shouldFocusError: false,
    defaultValues: {
      status: "CK",
      DetailIngredients: [{ ingredientId: "trungga", amount: "", unit: "quả" }],
      Steps: [{ description: "", image: [] }],
    },
    mode: "all",
  });

  const { mutate, isLoading } = useAddRecipe();

  const onSubmit: SubmitHandler<Recipe.TRecipeParams> = (values) => {
    if (values.recipeName?.trim() === "") {
      setFocus("recipeName");
      setError("recipeName", { message: ERROR_CODE.RECIPE_NAME_BLANK_ERROR });
      return;
    }
    const Steps = values.Steps.map((item, index) => {
      item.image =
        item.image && Array.isArray(item.image) && item.image.length > 0
          ? item.image[0].response
          : null;
      item.stepIndex = index + 1;
      return item;
    });
    const DetailIngredients = sumObjects(values.DetailIngredients);
    DetailIngredients.map((item) => {
      item.amount = item.amount + " " + item.unit;
      return item;
    });
    const validateData = {
      ...values,
      Steps: Steps,
      image: values.image[0].response,
      video:
        values.video && Array.isArray(values.video) && values.video.length > 0
          ? values.video[0].response
          : null,
      DetailIngredients,
    };
    mutate(validateData, {
      onSuccess: (data) => {
        console.log(data);
        if (data.status === 200) {
          notification.success({
            message: ERROR_CODE.SUCCESS_CREATE_RECIPE,
          });
          navigate("/");
        } else if (data.status === 418) {
          notification.error({
            message: data.data.message,
          });
        } else if (data.status === 500) {
          notification.error({
            message: data.data.message,
          });
        }
      },
      onError: (error: any) => {
        notification.error({
          message: error,
        });
      },
    });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
  };
};
