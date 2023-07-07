import { PATH, URL_LOGIN } from "./api-path"
import axios from "axios"
import { LOCAL_STORAGE_TOKEN_NAME } from "../../utils/constant"

export async function login(body: API_AUTH.LoginParams) {
    try {
        const response = await axios.post(URL_LOGIN, body)
        if(response.data.success){
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.data)
        }
        return response
    } catch (error : any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}

export async function getCurrentUser() {
    try {
        const response = await axios.get(PATH)
        if(response.data.success){
            return response.data.data
        }
    } catch (error: any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}