import { apiUrl } from "../../contants/constant";
const COMMENT_PATH = `${apiUrl}/comment`
const PATH = `${apiUrl}/recipe`
const FETCH_RECIPE_BY_INGREDIENT = `${PATH}/getRecipeByIngredient`
const FETCH_RECIPE_FROM_FOLLOWERS = `${PATH}/getRecipeFromFollowers`
const FETCH_RECIPE_POPULAR = `${PATH}/getPopularRecipe`
const FETCH_RECIPE_BY_ID = `${PATH}/getRecipe`
const FETCH_COMMENTS_BY_RECIPE_ID = `${COMMENT_PATH}/getCommentOfRecipe`
const ADD_RECIPE = `${PATH}/createRecipe`
const UPDATE_RECIPE = `${PATH}/updateRecipe/`

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    FETCH_RECIPE_BY_INGREDIENT,
    FETCH_RECIPE_FROM_FOLLOWERS,
    FETCH_RECIPE_POPULAR,
    FETCH_RECIPE_BY_ID,
    FETCH_COMMENTS_BY_RECIPE_ID,
    ADD_RECIPE,
    UPDATE_RECIPE
}




