import { notification } from "antd"
import { useDeleteRecipe, useDislikeRecipe, useLikeRecipe, useRecipeByFollow, useRecipeByIngredient, useRecipePopular } from "../../../../services/Recipe/service"
import React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useIngredientName } from "../../../../services/Ingredient/service"

export const useDelete = (recipeId: number, setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    const {data: ingredientName} = useIngredientName()
    const {mutate, isLoading} = useDeleteRecipe()
    const {mutate: likeRecipe} = useLikeRecipe()
    const {mutate: dislikeRecipe} = useDislikeRecipe()

    const queryClient = useQueryClient()
    const {refetch: refetchRecipeByIngredient} = useRecipeByIngredient()

    const handleConfirm = () => {
        mutate(recipeId, {
            onSuccess: (data) => {
                if(data.status === 200) {
                    notification.success({
                        message: 'Xóa công thức thành công'
                    })
                    queryClient.invalidateQueries(['recipePopular'])
                    queryClient.invalidateQueries(['recipeFollow'])
                    refetchRecipeByIngredient()
                }
                setIsDeleteModalOpen(false)
            },
            onError: (error) => {
                setIsDeleteModalOpen(false)
            }
        })
    }
    
    const handleLikeRecipe = () => {
        likeRecipe(recipeId, {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['recipeByIngredient', ingredientName])
                queryClient.invalidateQueries(['recipePopular'])
                queryClient.invalidateQueries(['recipeFollow'])
                queryClient.invalidateQueries(['searchResultRecipe'])
                queryClient.invalidateQueries(['recipeByUserId'])
                queryClient.invalidateQueries(['recipeFavorite'])
            }
        })
    }

    const handleDislikeRecipe = () => {
        dislikeRecipe(recipeId, {
            onSuccess: () => {
                queryClient.invalidateQueries(['recipeFavorite'])
                queryClient.invalidateQueries(['searchResultRecipe'])
                queryClient.invalidateQueries(['recipeByIngredient', ingredientName])
                queryClient.invalidateQueries(['recipePopular'])
                queryClient.invalidateQueries(['recipeFollow'])
                queryClient.invalidateQueries(['recipeByUserId'])

            }
        })
    }

    return {isLoading, handleConfirm, handleLikeRecipe, handleDislikeRecipe}
}