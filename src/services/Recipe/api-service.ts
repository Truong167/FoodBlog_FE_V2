import { FETCH_COMMENTS_BY_RECIPE_ID, FETCH_RECIPE_BY_ID, FETCH_RECIPE_BY_INGREDIENT, FETCH_RECIPE_FROM_FOLLOWERS, FETCH_RECIPE_POPULAR } from "./api-path"
import axios from "axios"

export async function fetchRecipeByIngredient(name: any) {
    try {
        if (name) {
            const result = await axios.get(`${FETCH_RECIPE_BY_INGREDIENT}/${name}`)
            if (result.data.success) {
                return result.data.data
            }
        }
    } catch (error: any) {
        console.log(error)
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function fetchRecipeFromFollower() {
    try {
        const result = await axios.get(FETCH_RECIPE_FROM_FOLLOWERS)
        if (result.data.success) {
            return result.data.data
        }
    } catch (error: any) {
        console.log(error)
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function fetchRecipePopular() {
    try {
        const result = await axios.get(FETCH_RECIPE_POPULAR)
        if (result.data.success) {
            return result.data.data
        }
    } catch (error: any) {
        console.log(error)
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function fetchSingleRecipe(id: number) {
    console.log(id)
    try {
        const result = await axios.get(`${FETCH_RECIPE_BY_ID}/${id}`)
        if (result.data.success) {
            console.log(result.data)
            return result.data.data
        }
    } catch (error: any) {
        console.log(error)
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function fetchComments(id: number) {
    console.log(id)
    try {
        const result = await axios.get(`${FETCH_COMMENTS_BY_RECIPE_ID}/${id}`)
        console.log(result)
        if (result.data.success) {
            console.log(result.data)
            return result.data.data
        }
    } catch (error: any) {
        console.log(error)
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}
