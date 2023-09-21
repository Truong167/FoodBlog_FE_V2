import API_ENDPOINTS from './api-path'
import axios from "axios"


export async function getBookmarkList(recipeId: string) {
    try {
        const response = await axios.get(`${API_ENDPOINTS.GET_BOOKMARK_LIST}/${recipeId}`)
        if(response.data.success){
            return response.data.data
        }
    } catch (error: any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}

export async function getRecipeList() {
    try {
        const response = await axios.get(`${API_ENDPOINTS.GET_RECIPE_LIST}`)
        if(response.data.success){
            return response.data.data
        }
    } catch (error: any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}

export async function getRecipe(recipeListId: number) {
    try {
        const response = await axios.get(`${API_ENDPOINTS.GET_RECIPE}/${recipeListId}`)
        if(response.data.success){
            return response.data.data
        }
    } catch (error: any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}

export async function createRecipeToBookMark(recipeId: number, body: Recipe_List.TCreateRecipeToBookMarkParams) {
    try {
        const response = await axios.post(`${API_ENDPOINTS.ADD_RECIPE_TO_BOOKMARK}/${recipeId}`, {recipeListDetail: body})
        if(response.data.success){
            return response
        }
    } catch (error: any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}

export async function createRecipeList(body: Recipe_List.TCreateRecipeList) {
    try {
        const response = await axios.post(`${API_ENDPOINTS.CREATE_RECIPE_LIST}`, body)
        if(response.data.success){
            return response
        }
    } catch (error: any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}

export async function deleteRecipeInRecipeList(recipeListId: number, recipeId: number) {
    try {
        const response = await axios.delete(`${API_ENDPOINTS.DELETE_RECIPE_IN_RECIPE_LIST}/${recipeListId}/${recipeId}`)
        if(response.data.success){
            return response
        }
    } catch (error: any) {
        if(error?.response?.data) return error.response
        return {success: false, message: error.message}
    }
}

