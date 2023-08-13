import { apiUrl } from "../../contants/constant";
const COMMENT_PATH = `${apiUrl}/comment`
const PATH = `${apiUrl}/recipe`
const FAVORITE_PATH = `${apiUrl}/favorite`

const FETCH_COMMENTS_BY_RECIPE_ID = `${COMMENT_PATH}/getCommentOfRecipe`
const CREATE_COMMENT = `${COMMENT_PATH}/createComment`
const UPDATE_COMMENT = `${COMMENT_PATH}/updateComment`
const DELETE_COMMENT = `${COMMENT_PATH}/deleteComment`


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

const SEARCH_RESULT_RECIPE_NAME = `${PATH}/searchRecipe`

const GET_MY_RECIPE = `${PATH}/getMyRecipe`
const GET_RECIPE_BY_USERID = `${PATH}/getRecipeByUserId`

const GET_RECIPE_FAVORITE = `${PATH}/getRecipeFavorite`

const UPDATE_PRIVACY_RECIPE = `${PATH}/updatePrivacyRecipe`


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
    SEARCH_RECIPE_NAME,
    SEARCH_RESULT_RECIPE_NAME,
    GET_MY_RECIPE,
    GET_RECIPE_BY_USERID,
    GET_RECIPE_FAVORITE,
    UPDATE_PRIVACY_RECIPE,
    UPDATE_COMMENT,
    DELETE_COMMENT
}




