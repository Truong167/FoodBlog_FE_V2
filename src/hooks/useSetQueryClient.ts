import { useQueryClient } from "@tanstack/react-query";


export const useSetQuery = (name: string[], data: any) => {
    const queryClient = useQueryClient();

    return queryClient.setQueryData(name, data);
};