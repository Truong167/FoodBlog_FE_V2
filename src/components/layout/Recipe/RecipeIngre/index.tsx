import { Skeleton } from "antd"
import { useGetFetchQuery } from "../../../../hooks/useGetQueryClient"
import { useSetQuery } from "../../../../hooks/useSetQueryClient"
import { useIngredientName, useIngredients } from "../../../../services/Ingredient/service"
import { useRecipeByIngredient } from "../../../../services/Recipe/service"
import IngredientList from "../../../Ingredient/IngredientList"
import RecipeCard from "../../../Recipe/RecipeItem/RecipeCard"
import RecipeList from "../../../Recipe/RecipeList"
import Section from "../../../Section/Section"
import { Fragment } from "react"


const RecipeIngre = () => {
    const ingreName = useGetFetchQuery(['ingredientName'])
    const { isLoading, data } = useIngredients()
    const { isLoading: recipeLoading, data: recipes } = useRecipeByIngredient()
    return (
        <Section>
            {isLoading && recipeLoading 
                ? 
                <Skeleton active /> 
                :
                <Fragment>
                    <h4>Các nguyên liệu đang trong mùa</h4>
                    <IngredientList ingredient={data} isActive={ingreName} />
                    <RecipeList recipes={recipes} />
                </Fragment>
            }
        </Section>
    )
}

export default RecipeIngre
