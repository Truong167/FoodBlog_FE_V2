import { apiUrl } from "../../utils/constant";
export const COMMENT_PATH = `${apiUrl}/comment`
export const PATH = `${apiUrl}/recipe`
export const FETCH_RECIPE_BY_INGREDIENT = `${PATH}/getRecipeByIngredient`
export const FETCH_RECIPE_FROM_FOLLOWERS = `${PATH}/getRecipeFromFollowers`
export const FETCH_RECIPE_POPULAR = `${PATH}/getPopularRecipe`
export const FETCH_RECIPE_BY_ID = `${PATH}/getRecipe`
export const FETCH_COMMENTS_BY_RECIPE_ID = `${COMMENT_PATH}/getCommentOfRecipe`




