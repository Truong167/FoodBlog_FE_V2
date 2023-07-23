import API_ENDPOINTS from "./api-path"
import axios from "axios"

export async function uploadFile(body: any) {
    try {
        const response = await axios.post(API_ENDPOINTS.PATH, body)
        if(response.data.success){
            return response
        }
    } catch (error : any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}

export async function deleteFile(params: string) {
    try {
        const response = await axios.delete(`${API_ENDPOINTS.DELETE_MEDIA_FILE}/${params}`)
        if(response.data.success){
            return response
        }
    } catch (error : any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}

