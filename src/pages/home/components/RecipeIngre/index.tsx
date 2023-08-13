import { Skeleton } from "antd"
import { useGetFetchQuery } from "../../../../hooks/useGetQueryClient"
import { useIngredients } from "../../../../services/Ingredient/service"
import { useRecipeByIngredient } from "../../../../services/Recipe/service"
import { Fragment } from "react"
import Section from "../../../../components/Section/Section"
import IngredientList from "../../../../components/Ingredient/IngredientList"
import RecipeList from "../../../../components/Recipe/RecipeList"


const RecipeIngre = () => {
    const ingreName = useGetFetchQuery(['ingredientName'])
    const { isLoading, data } = useIngredients()
    const { isLoading: recipeLoading, data: recipes } = useRecipeByIngredient()
    return (
        <Section>
            {(isLoading && recipeLoading && ingreName) 
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
