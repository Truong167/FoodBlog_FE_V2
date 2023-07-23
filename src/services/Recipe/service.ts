import { useMutation, useQuery } from "@tanstack/react-query";
import { addRecipe, fetchComments, fetchRecipeByIngredient, fetchRecipeFromFollower, fetchRecipePopular, fetchSingleRecipe, updateRecipe } from "./api-service";
import { useIngredientName } from "../Ingredient/service";

type TUpdateRecipeParams = {
    params: { recipeId: string; body: Partial<Recipe.TRecipeDetailResponse> };
  };
  

export const useRecipeByIngredient = () => {
    const {data: name} = useIngredientName()
    const { isLoading, data } = useQuery({
        queryKey: ['recipeByIngredient', name],
        queryFn: () => fetchRecipeByIngredient(name),
        refetchOnWindowFocus: false,
        refetchOnMount: false
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

export const useAddRecipe = () => {
    return useMutation((body: Recipe.TRecipeParams) => addRecipe(body))
}

export const useUpdateRecipe = () => {
    return useMutation(({ params: { recipeId, body } }: TUpdateRecipeParams) => updateRecipe(recipeId, body)
  );

}
