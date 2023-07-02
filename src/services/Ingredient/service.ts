import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchIngredient } from "./api-service";


export const useIngredients = () => {
    const queryClient = useQueryClient()
    const { isLoading, data } = useQuery({
        queryKey: ['ingredientBySeason'],
        queryFn: () => fetchIngredient(),
        onSuccess(data) {
            queryClient.setQueryData(['ingredientName'], data[0].name)
        },
    })
    return { isLoading, data }
};

export const useIngredientName = () => {
    const { isLoading, data } = useQuery({
        queryKey: ['ingredientName'],
        queryFn: (name) => {
            console.log(name)
            return name
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        // enabled: false,
        // staleTime: Infinity
    })
    return { isLoading, data }
}


