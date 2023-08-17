import { useMutation, useQuery } from "@tanstack/react-query";
import { createRecipeList, createRecipeToBookMark, deleteRecipeInRecipeList, getBookmarkList, getRecipe, getRecipeList } from "./api-service";

type TCreateRecipe = {
    params: {recipeId: number; body: Recipe_List.TCreateRecipeToBookMarkParams}
}

type TDeleteRecipe = {
    params: {recipeListId: number; recipeId: number}
}

export const useBookmarkList = (recipeId: string) => {
    return useQuery({
        queryKey: ['bookmarkList', recipeId],
        queryFn: () => getBookmarkList(recipeId),
        refetchOnWindowFocus: false
    })
}

export const useRecipeList = () => {
    return useQuery({
        queryKey: ['recipeList'],
        queryFn: getRecipeList,
        refetchOnWindowFocus: false
    })
}

export const useRecipe = (recipeListId: number) => {
    return useQuery({
        queryKey: ['recipeInBookMark', recipeListId],
        queryFn: () => getRecipe(recipeListId),
        refetchOnWindowFocus: false
    })
}

export const useCreateRecipeToBookMark = () => {
    return useMutation(({ params: { recipeId, body } }: TCreateRecipe) => createRecipeToBookMark(recipeId, body))
}

export const useCreateRecipeList = () => {
    return useMutation((body: Recipe_List.TCreateRecipeList) => createRecipeList(body))
}

export const useDeleteRecipeInRecipeList = () => {
    return useMutation(({params: {recipeListId, recipeId}}: TDeleteRecipe ) => deleteRecipeInRecipeList(recipeListId, recipeId))
}


