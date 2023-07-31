import { apiUrl } from "../../contants/constant";
const COMMENT_PATH = `${apiUrl}/comment`
const PATH = `${apiUrl}/recipe`
const FAVORITE_PATH = `${apiUrl}/favorite`

const FETCH_COMMENTS_BY_RECIPE_ID = `${COMMENT_PATH}/getCommentOfRecipe`
const CREATE_COMMENT = `${COMMENT_PATH}/createComment`

const FETCH_RECIPE_BY_INGREDIENT = `${PATH}/getRecipeByIngredient`
const FETCH_RECIPE_FROM_FOLLOWERS = `${PATH}/getRecipeFromFollowers`
const FETCH_RECIPE_POPULAR = `${PATH}/getPopularRecipe`
const FETCH_RECIPE_BY_ID = `${PATH}/getRecipe`
const ADD_RECIPE = `${PATH}/createRecipe`
const UPDATE_RECIPE = `${PATH}/updateRecipe/`
const DELETE_RECIPE = `${PATH}/deleteRecipe`

const LIKE_RECIPE = `${FAVORITE_PATH}/create`
const DISLIKE_RECIPE = `${FAVORITE_PATH}/delete`

const SEARCH_RECIPE_NAME = `${PATH}/search`


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    FETCH_RECIPE_BY_INGREDIENT,
    FETCH_RECIPE_FROM_FOLLOWERS,
    FETCH_RECIPE_POPULAR,
    FETCH_RECIPE_BY_ID,
    FETCH_COMMENTS_BY_RECIPE_ID,
    ADD_RECIPE,
    UPDATE_RECIPE,
    CREATE_COMMENT,
    DELETE_RECIPE,
    LIKE_RECIPE,
    DISLIKE_RECIPE,
    SEARCH_RECIPE_NAME
}




