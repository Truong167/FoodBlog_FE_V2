import { SubmitHandler, useForm } from "react-hook-form";
import { useAddRecipe, useUpdateRecipe } from "../../../../../services/Recipe/service";
import { Steps, notification } from "antd";
import { imageUrl } from "../../../../../contants/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateRecipe } from "../../../../../utils/validateRecipe";

export const useSubmit = (data: Partial<Recipe.TRecipeDetailResponse>, recipeId: string) => {
    console.log(data)
    const { mutate, isLoading } = useUpdateRecipe()
    const { control, handleSubmit, formState: { dirtyFields } } = useForm<any>({
        resolver: yupResolver(validateRecipe),
        shouldFocusError: false,
        defaultValues: {
            ...data,
            image: data.image ? [data.image] : null,
            video: data.video ? [data.video] : null,
            Steps: data.Steps?.map(item => {
                return {
                    ...item,
                    image: item.image ? [item.image] : null
                }
            }),

        }
    })


    const onSubmit: SubmitHandler<Recipe.TRecipeParams> = (values) => {
        console.log(values, recipeId)
        console.log(dirtyFields)
        const validateDate = {
            ...values,
            video: values.video[0].hasOwnProperty('response') ? values.video[0].response : values.video[0].id,
            image: values.image[0].hasOwnProperty('response') ? values.image[0].response : values.image[0].id,
            Steps: values.Steps.map((item, index) => {
                console.log(item)
                return {
                    ...item,
                    stepIndex: index + 1,
                    image: item.image && item.image[0].hasOwnProperty('response') ? item.image[0].response : null
                }
            }),
            DetailIngredients: values.DetailIngredients?.map(item => {
                return {
                    ...item,
                    amount: item.amount + ' ' + item.unit
                }
            })
        }
        console.log(validateDate)
        mutate({
            params: {
                recipeId: recipeId,
                body: validateDate
            }
        }, {
            onSuccess: (data) => {
                console.log(data)
            }
        })
    };

    return {
        control,
        handleSubmit,
        onSubmit,
        isLoading
    }
}