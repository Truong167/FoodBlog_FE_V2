import { useQuery } from "@tanstack/react-query";
import { fetchComments, fetchRecipeByIngredient, fetchRecipeFromFollower, fetchRecipePopular, fetchSingleRecipe } from "./api-service";
import { useIngredientName } from "../Ingredient/service";


export const useRecipeByIngredient = () => {
    const {data: name} = useIngredientName()
    console.log(name)
    const { isLoading, data } = useQuery({
        queryKey: ['recipeByIngredient', name],
        queryFn: () => fetchRecipeByIngredient(name)
    })
    return { isLoading, data }
}

export const useRecipeByFollow = () => {
    const { isLoading, data } = useQuery({
        queryKey: ['recipeFollow'],
        queryFn: () => fetchRecipeFromFollower()
    })
    return { isLoading, data }
}

export const useRecipePopular = () => {
    const { isLoading, data } = useQuery({
        queryKey: ['recipePopular'],
        queryFn: () => fetchRecipePopular()
    })
    return { isLoading, data }
}

export const useRecipeById = (recipeId: any) => {
    const { isLoading, data } = useQuery({
        queryKey: ['singleRecipe', recipeId],
        queryFn: () => fetchSingleRecipe(recipeId)
    })
    return { isLoading, data }
}

export const useCommentsById = (recipeId: any) => {
    const { isLoading, data } = useQuery({
        queryKey: ['comment', recipeId],
        queryFn: () => fetchComments(recipeId)
    })
    return { isLoading, data }
}
