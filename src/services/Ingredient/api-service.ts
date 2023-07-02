import { GET_INGREDIENTS_BY_SEASON, PATH } from "./api-path"
import axios from "axios"

export async function fetchIngredient() {
    try {
        const result = await axios.get(GET_INGREDIENTS_BY_SEASON)
        if(result.data.success){
            return result.data.data
        }
    } catch (error: any) {
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