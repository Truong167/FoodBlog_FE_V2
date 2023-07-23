import { apiUrl } from "../../utils/constant";
export const PATH = `${apiUrl}/ingredient`
const GET_INGREDIENTS_BY_SEASON = `${PATH}/getIngredientBySeason`
const GET_ALL_INGREDIENT = `${PATH}/getAllIngredient`

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    GET_INGREDIENTS_BY_SEASON,
    GET_ALL_INGREDIENT
}