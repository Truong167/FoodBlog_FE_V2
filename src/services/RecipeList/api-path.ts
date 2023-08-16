/* eslint-disable import/no-anonymous-default-export */

import { apiUrl } from "../../contants/constant";
export const PATH = `${apiUrl}/recipeList`
const GET_BOOKMARK_LIST = `${PATH}/getBookmarkList`
const GET_RECIPE_LIST = `${PATH}/getRecipeList`
const GET_RECIPE = `${PATH}/getRecipe`
const ADD_RECIPE_TO_BOOKMARK = `${PATH}/createRecipe`


export default {
    GET_BOOKMARK_LIST,
    GET_RECIPE_LIST,
    ADD_RECIPE_TO_BOOKMARK,
    GET_RECIPE
}