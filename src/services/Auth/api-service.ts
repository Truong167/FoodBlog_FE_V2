import { useMutation } from "@tanstack/react-query"
import { URL_LOGIN } from "./api-path"
import axios from "axios"
import { LOCAL_STORAGE_TOKEN_NAME } from "../../utils/constant"

export async function login(body: API_AUTH.LoginParams, options?: { [key: string]: any }) {
    try {
        const response = await axios.post(URL_LOGIN.endPoints, body)
        if(response.data.success){
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.data)
        }
        return response
    } catch (error : any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}