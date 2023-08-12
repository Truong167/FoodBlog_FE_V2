import { GET_CURRENT_USER, UPDATE_USER, URL_LOGIN, URL_REGISTER } from "./api-path"
import axios from "axios"
import { LOCAL_STORAGE_TOKEN_NAME } from "../../contants/constant"

export async function login(body: AUTH.TLoginParams) {
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

export async function register(body: AUTH.TRegisterParams) {
    try {
        const response = await axios.post(URL_REGISTER, body)
        if(response.data.success){
            return response
        }
    } catch (error : any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}

export async function getCurrentUser() {
    try {
        const response = await axios.get(GET_CURRENT_USER)
        if(response.data.success){
            return response.data.data
        }
    } catch (error: any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}

export async function updateUser(body: AUTH.TUser) {
    try {
        const response = await axios.put(UPDATE_USER, body)
        if(response.data.success){
            return response
        }
    } catch (error: any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}