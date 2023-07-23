import { useQueryClient } from "@tanstack/react-query"
import { useUser } from "../../../services/Auth/service"
import { LOCAL_STORAGE_TOKEN_NAME } from "../../../utils/constant"


export const useAvatarDropDown = () => {
    const { isLoading, data } = useUser()
    const queryClient = useQueryClient()
    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        queryClient.setQueryData(['isAuthenticated'], false)

    }
    return { isLoading, data, logout }
}