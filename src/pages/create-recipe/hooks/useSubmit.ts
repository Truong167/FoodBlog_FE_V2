import { SubmitHandler, useForm } from "react-hook-form";
import { useAddRecipe } from "../../../services/Recipe/service";
import { notification } from "antd";
import { yupResolver } from '@hookform/resolvers/yup';
import { validateRecipe } from "../../../utils/validateRecipe";
import { sumObjects } from "../../../utils/sumObject";

export const useSubmit = () => {
    const { control, handleSubmit, formState: {errors} } = useForm<any>({
        resolver: yupResolver(validateRecipe),
        shouldFocusError: false,
        defaultValues: {
            status: 'CK',
            DetailIngredients: [{ ingredientId: 'trungga', amount: '', unit: 'quả' }],
            Steps: [{ description: '', image: [] }],
        },
        mode: 'all'
    })

    const { mutate, isLoading } = useAddRecipe()

    const onSubmit: SubmitHandler<Recipe.TRecipeParams> = (values) => {
        const Steps = values.Steps.map((item, index) => {
            item.image = item.image.length > 0 ? item.image[0].response : null
            item.stepIndex = index + 1;
            return item
        })
        const DetailIngredients = sumObjects(values.DetailIngredients) 
        DetailIngredients.map(item => {
            item.amount = item.amount + ' ' + item.unit
            return item
        })
        const validateData = {
            ...values,
            Steps: Steps,
            image: values.image[0].response,
            video: values.video ? values.video[0].response : null,
            DetailIngredients
        }
        mutate(validateData, {
            onSuccess: (data) => {
                if(data.status === 200) {
                    notification.success({
                        message: 'Thêm công thức thành công'
                    })
                } else if(data.status === 418) {
                    notification.error({
                        message: 'Vui lòng nhập đầy đủ thông tin'
                    })
                }
            },
            onError: (error: any) => {
                notification.error({
                    message: error
                })
            }
        }
        )
    };

    return {
        control,
        handleSubmit,
        onSubmit,
        isLoading
    }
}