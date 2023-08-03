import { useQueryClient } from "@tanstack/react-query"
import { useUser } from "../../../services/Auth/service"
import { LOCAL_STORAGE_TOKEN_NAME } from "../../../contants/constant"


export const useAvatarDropDown = () => {
    const { isLoading, data } = useUser()
    const queryClient = useQueryClient()
    console.log(data)
    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        queryClient.setQueryData(['isAuthenticated'], false)

    }
    return { isLoading, data, logout }
}