import API_ENDPOINT from "./api-path"
import axios from "axios"


export async function getUserById(userId: string) {
    try {
        const response = await axios.get(`${API_ENDPOINT.GET_USER_BY_ID}/${userId}`)
        if(response.data.success){
            return response.data.data
        }
    } catch (error: any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}