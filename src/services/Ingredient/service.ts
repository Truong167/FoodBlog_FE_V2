import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchIngredient, getAllIngredient } from "./api-service";


export const useIngredients = () => {
    const queryClient = useQueryClient()
    const { isLoading, data } = useQuery({
        queryKey: ['ingredientBySeason'],
        queryFn: fetchIngredient,
        onSuccess: (data) => {
            if(data && Array.isArray(data) && data.length > 0){
                queryClient.setQueryData(['ingredientName'], data[0].name)
            }
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: Infinity
    })
    return { isLoading, data }
};

export const useIngredientName = () => {
    const { isLoading, data } = useQuery({
        queryKey: ['ingredientName'],
        queryFn: (name) => {
            return name
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
    return { isLoading, data }
}

export const useGetALlIngredient = () => {
    return useQuery({
        queryKey: ['ingredients'],
        queryFn: getAllIngredient,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
}


