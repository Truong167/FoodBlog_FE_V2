import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchIngredient } from "./api-service";


export const useIngredients = () => {
    const queryClient = useQueryClient()
    const { isLoading, data } = useQuery({
        queryKey: ['ingredientBySeason'],
        queryFn: fetchIngredient,
        onSuccess: (data) => {
            queryClient.setQueryData(['ingredientName'], data[0].name)
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
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
    return { isLoading, data }
}


