import { useMutation, useQuery } from "@tanstack/react-query";
import { addRecipe, createComment, deleteRecipe, dislikeRecipe, fetchComments, fetchRecipeByIngredient, fetchRecipeFromFollower, fetchRecipePopular, fetchSingleRecipe, likeRecipe, searchRecipe, updateRecipe } from "./api-service";
import { useIngredientName } from "../Ingredient/service";

type TUpdateRecipeParams = {
    params: { recipeId: string; body: Partial<Recipe.TRecipeDetailResponse> };
};

type TCreateComment = {
    params: { recipeId: string; body: Recipe.TComment };
};
  

export const useCommentsById = (recipeId: any) => {
    const { isLoading, data } = useQuery({
        queryKey: ['comment', recipeId],
        queryFn: () => fetchComments(recipeId),
        refetchOnWindowFocus: false
    })
    return { isLoading, data }
}

export const useCreateComment = () => {
    return useMutation(({params: {recipeId, body}}: TCreateComment) => createComment(recipeId, body))
}

export const useSearchRecipe = (q: string) => {
    return useQuery({
        queryKey: ['searchRecipe', q],
        queryFn: () => searchRecipe(q),
    })
}

export const useDeleteRecipe = () => {
    return useMutation((recipeId: number) => deleteRecipe(recipeId))
}

export const useLikeRecipe = () => {
    return useMutation((recipeId: number) => likeRecipe(recipeId))
}

export const useDislikeRecipe = () => {
    return useMutation((recipeId: number) => dislikeRecipe(recipeId))
}

export const useRecipeByIngredient = () => {
    const {data: name} = useIngredientName()
    return useQuery({
        queryKey: ['recipeByIngredient', name],
        queryFn: () => fetchRecipeByIngredient(name),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
}

export const useRecipeByFollow = () => {
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['recipeFollow'],
        queryFn: () => fetchRecipeFromFollower()
    })
    return { isLoading, data, refetch }
}

export const useRecipePopular = () => {
    return useQuery({
        queryKey: ['recipePopular'],
        queryFn: () => fetchRecipePopular()
    })
}

export const useRecipeById = (recipeId: any) => {
    return useQuery({
        queryKey: ['singleRecipe', recipeId],
        queryFn: () => fetchSingleRecipe(recipeId)
    })
}

export const useAddRecipe = () => {
    return useMutation((body: Recipe.TRecipeParams) => addRecipe(body))
}

export const useUpdateRecipe = () => {
    return useMutation(({ params: { recipeId, body } }: TUpdateRecipeParams) => updateRecipe(recipeId, body)
  );

}
