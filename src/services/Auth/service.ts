import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../contants/constant";
import { getCurrentUser, login, register } from "./api-service";


export const useLogin = () => {
    const { isLoading, mutate } = useMutation({
        mutationFn: login,
    });

  return { isLoading, mutate };
};

export const useRegister = () => {
    const { isLoading, mutate } = useMutation({
        mutationFn: register,
    });

  return { isLoading, mutate };
};

export const useAuth = () => {
    const { isLoading, data } = useQuery({
        queryKey: ['isAuthenticated'],
        queryFn: () => {
            const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
            if(token){
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                return true
            }
            return false
        },
    })
    return { isLoading, data }
}

export const useUser = () => {
    const { isLoading, data } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
    })
    return { isLoading, data }
}
