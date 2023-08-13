import { useMutation, useQuery } from "@tanstack/react-query";
import { addRecipe, createComment, deleteComment, deleteRecipe, dislikeRecipe, fetchComments, fetchRecipeByIngredient, fetchRecipeFromFollower, fetchRecipePopular, fetchSingleRecipe, getMyRecipe, getRecipeByUserId, getRecipeFavorite, likeRecipe, searchRecipe, searchResultRecipe, updateComment, updatePrivacy, updateRecipe } from "./api-service";
import { useIngredientName } from "../Ingredient/service";

type TUpdateRecipeParams = {
    params: { recipeId: string; body: Partial<Recipe.TRecipeDetailResponse> };
};

type TCreateComment = {
    params: { recipeId: string; body: Recipe.TComment };
};

type TUpdateComment = {
    params: { commentId: string; body: Recipe.TComment };
};

type TUpdatePrivacy = {
    params: {recipeId: number; body: Recipe.TStatus}
}
  

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

export const useUpdateComment = () => {
    return useMutation(({params: {commentId, body}}: TUpdateComment) => updateComment(commentId, body))
}

export const useDeleteComment = () => {
    return useMutation((commentId: string) => deleteComment(commentId))
}

export const useSearchRecipe = (q: string) => {
    return useQuery({
        queryKey: ['searchRecipe', q],
        queryFn: () => searchRecipe(q),
    })
}

export const useGetMyRecipe = () => {
    return useQuery({
        queryKey: ['myRecipe'],
        queryFn: getMyRecipe,
    })
}

export const useGetRecipeByUserId = (userId: string) => {
    return useQuery({
        queryKey: ['recipeByUserId', userId],
        queryFn: () => getRecipeByUserId(userId),
    })
}

export const useGetRecipeFavorite = () => {
    return useQuery({
        queryKey: ['recipeFavorite'],
        queryFn: getRecipeFavorite,
    })
}

export const useSearchResultRecipe = (q: string) => {
    return useQuery({
        queryKey: ['searchResultRecipe'],
        queryFn: () => searchResultRecipe(q),
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
        queryFn: () => fetchRecipeFromFollower(),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
    return { isLoading, data, refetch }
}

export const useRecipePopular = () => {
    return useQuery({
        queryKey: ['recipePopular'],
        queryFn: () => fetchRecipePopular(),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
}

export const useRecipeById = (recipeId: any) => {
    return useQuery({
        queryKey: ['singleRecipe', recipeId],
        queryFn: () => fetchSingleRecipe(recipeId),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
}

export const useAddRecipe = () => {
    return useMutation((body: Recipe.TRecipeParams) => addRecipe(body))
}

export const useUpdateRecipe = () => {
    return useMutation(({ params: { recipeId, body } }: TUpdateRecipeParams) => updateRecipe(recipeId, body)
  );
}

export const useUpdatePrivacy = () => {
    return useMutation(({ params: { recipeId, body } }: TUpdatePrivacy) => updatePrivacy(recipeId, body)
  );
}
