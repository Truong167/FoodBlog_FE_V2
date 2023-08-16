import { useMutation, useQuery } from "@tanstack/react-query";
import { createRecipeToBookMark, getBookmarkList, getRecipe, getRecipeList } from "./api-service";

type TCreateRecipe = {
    params: {recipeId: number; body: Recipe_List.TCreateRecipeToBookMarkParams}
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


