import { useQuery } from "@tanstack/react-query";
import { getUserById } from "./api-service";


export const useGetUserById = (userId: string) => {
    return useQuery({
        queryKey: ['userById', userId],
        queryFn: () => getUserById(userId),
        refetchOnWindowFocus: false
    })
}
