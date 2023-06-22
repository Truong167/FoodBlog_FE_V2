import { useMutation, useQuery } from "@tanstack/react-query";
import { login } from "../../../services/Auth/api-service";


export const useLogin = () => {
    const { isLoading, mutate } = useMutation({
        mutationFn: login,
    });

  return { isLoading, mutate };
};

export const useAuth = () => {
    const { isLoading, data } = useQuery({
        queryKey: ['authenticated'],
        queryFn: () => false,
    })
    return { isLoading, data }
}
