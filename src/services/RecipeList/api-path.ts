/* eslint-disable import/no-anonymous-default-export */

import { apiUrl } from "../../contants/constant";
export const PATH = `${apiUrl}/recipeList`
const GET_BOOKMARK_LIST = `${PATH}/getBookmarkList`
const GET_RECIPE_LIST = `${PATH}/getRecipeList`
const GET_RECIPE = `${PATH}/getRecipe`
const ADD_RECIPE_TO_BOOKMARK = `${PATH}/createRecipe`
const CREATE_RECIPE_LIST = `${PATH}/createRecipeList`
const DELETE_RECIPE_IN_RECIPE_LIST = `${PATH}/deleteRecipe`


export default {
    GET_BOOKMARK_LIST,
    GET_RECIPE_LIST,
    ADD_RECIPE_TO_BOOKMARK,
    GET_RECIPE,
    CREATE_RECIPE_LIST,
    DELETE_RECIPE_IN_RECIPE_LIST
}