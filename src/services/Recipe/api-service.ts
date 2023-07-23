import API_ENDPOINT from "./api-path"
import axios from "axios"

export async function fetchRecipeByIngredient(name: any) {
    try {
        if (name) {
            const result = await axios.get(`${API_ENDPOINT.FETCH_RECIPE_BY_INGREDIENT}/${name}`)
            if (result.data.success) {
                return result.data.data
            }
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function fetchRecipeFromFollower() {
    try {
        const result = await axios.get(API_ENDPOINT.FETCH_RECIPE_FROM_FOLLOWERS)
        if (result.data.success) {
            return result.data.data
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function fetchRecipePopular() {
    try {
        const result = await axios.get(API_ENDPOINT.FETCH_RECIPE_POPULAR)
        if (result.data.success) {
            return result.data.data
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function fetchSingleRecipe(id: number) {
    try {
        const result = await axios.get(`${API_ENDPOINT.FETCH_RECIPE_BY_ID}/${id}`)
        if (result.data.success) {
            return result.data.data
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function fetchComments(id: number) {
    try {
        const result = await axios.get(`${API_ENDPOINT.FETCH_COMMENTS_BY_RECIPE_ID}/${id}`)
        if (result.data.success) {
            return result.data.data
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function addRecipe(body: Recipe.TRecipeParams) {
    try {
        const result = await axios.post(API_ENDPOINT.ADD_RECIPE, body)
        if(result.data.success){
          return result.data
        }
      } catch (error: any) {
        if(error.response.data) return error.response
        return {success: false, message: error.message}
      }
}

export async function updateRecipe(recipeId: string, body: Partial<Recipe.TRecipeDetailResponse>) {
    console.log(recipeId)
    try {
        const result = await axios.put(`${API_ENDPOINT.UPDATE_RECIPE + recipeId}`, body)
        console.log(result)
        if(result.data.success){
          return result.data
        }
      } catch (error: any) {
        if(error.response.data) return error.response
        return {success: false, message: error.message}
      }
}
