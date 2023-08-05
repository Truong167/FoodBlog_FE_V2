import API_ENDPOINT from "./api-path"
import axios from "axios"



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

export async function createComment(recipeId: string, body: Recipe.TComment) {
    try {
        const result = await axios.post(`${API_ENDPOINT.CREATE_COMMENT}/${recipeId}`, body)
        if (result.data.success) {
            return result
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response
        return { success: false, message: error.message }
    }
}

export async function updatePrivacy(recipeId: number, body: Recipe.TStatus) {
    try {
        const result = await axios.put(`${API_ENDPOINT.UPDATE_PRIVACY_RECIPE}/${recipeId}`, body)
        if (result.data.success) {
            return result
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response
        return { success: false, message: error.message }
    }
}


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

export async function getRecipeByUserId(userId: string) {
    try {
        const result = await axios.get(`${API_ENDPOINT.GET_RECIPE_BY_USERID}/${userId}`)
        if (result.data.success) {
            return result.data.data
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function getRecipeFavorite() {
    try {
        const result = await axios.get(API_ENDPOINT.GET_RECIPE_FAVORITE)
        if (result.data.success) {
            return result.data.data
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function searchRecipe(q: string) {
    try {
        const result = await axios.get(API_ENDPOINT.SEARCH_RECIPE_NAME, {
            params: {
                q
            }
        })
        if (result.data.success) {
            return result.data.data
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function searchResultRecipe(q: string) {
    try {
        const result = await axios.get(API_ENDPOINT.SEARCH_RESULT_RECIPE_NAME, {
            params: {
                q
            }
        })
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

export async function deleteRecipe(recipeId: number) {
    try {
        const result = await axios.delete(`${API_ENDPOINT.DELETE_RECIPE}/${recipeId}`)
        if (result.data.success) {

            return result
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function dislikeRecipe(recipeId: number) {
    try {
        const result = await axios.delete(`${API_ENDPOINT.DISLIKE_RECIPE}/${recipeId}`)
        if (result.data.success) {

            return result
        }
    } catch (error: any) {
        if (error?.response?.data) return error.response.data.data
        return { success: false, message: error.message }
    }
}

export async function likeRecipe(recipeId: number) {
    try {
        const result = await axios.post(`${API_ENDPOINT.LIKE_RECIPE}/${recipeId}`)
        if (result.data.success) {

            return result
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
    try {
        const result = await axios.put(`${API_ENDPOINT.UPDATE_RECIPE + recipeId}`, body)
        if(result.data.success){
          return result.data
        }
      } catch (error: any) {
        if(error.response.data) return error.response
        return {success: false, message: error.message}
      }
}
