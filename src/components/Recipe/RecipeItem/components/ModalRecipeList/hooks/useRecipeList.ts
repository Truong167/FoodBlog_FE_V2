import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { useCreateRecipeToBookMark } from "../../../../../../services/RecipeList/service";
import { notification } from "antd";


const useRecipeList = (recipeListDetail: {recipeListId: number, name: string, isBookmarked: boolean}[] | string, recipeId: number, setIsRecipeListModalOpen: React.Dispatch<React.SetStateAction<boolean>>,) => {
    const {control, handleSubmit} = useForm({
        defaultValues: {
            recipeListDetail: recipeListDetail
        }
    })

    const {mutate, isLoading} = useCreateRecipeToBookMark()

    const { fields } = useFieldArray({
        control,
        name: 'recipeListDetail'
    })

    const onSubmit: SubmitHandler<any> = (values) => {
        const validateData = values.recipeListDetail.filter((item: {recipeListId: number, name: string, isBookmarked: boolean}) => item.isBookmarked)
        console.log(validateData)
        mutate({
            params: {
                recipeId,
                body: validateData
            }
        }, {
            onSuccess: (data) => {
                if(data.status === 200) {
                    notification.success({
                        message: 'Lưu công thức thành công'
                    })
                }
                setIsRecipeListModalOpen(false)
            }
        })
    };

    return {control, fields, handleSubmit, onSubmit, isLoading}
}

export default useRecipeList