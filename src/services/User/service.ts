import { useMutation, useQuery } from "@tanstack/react-query";
import { follow, getUserById, unfollow } from "./api-service";


export const useGetUserById = (userId: string) => {
    return useQuery({
        queryKey: ['userById', userId],
        queryFn: () => getUserById(userId),
        // refetchOnWindowFocus: false
    })
}

export const useFollow = () => {
    return useMutation((userId: string) => follow(userId))
}

export const useUnfollow = () => {
    return useMutation((userId: string) => unfollow(userId))
}
