import { notification } from "antd"
import { useDeleteRecipeInRecipeList } from "../../../../../services/RecipeList/service"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

const useDetailBookMark = (recipeListId: number) => {
    const [recipeId, setRecipeId] = useState<number>(0)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const {mutate, isLoading} = useDeleteRecipeInRecipeList()

    const handleConfirmDelete = () => {
        mutate({
            params: {
                recipeListId,
                recipeId
            }
        }, {
            onSuccess: data => {
                if(data.status === 200) {
                    notification.success({
                        message: 'Xóa công thức thành công'
                    })
                    queryClient.invalidateQueries(['recipeInBookMark', recipeListId])
                    setIsOpenModal(false)
                }
            }
        })
    }

    return {handleConfirmDelete, isLoading, setRecipeId, setIsOpenModal, isOpenModal}
}

export default useDetailBookMark