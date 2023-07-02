import { useGetFetchQuery } from "../../../../hooks/useGetQueryClient"
import { useSetQuery } from "../../../../hooks/useSetQueryClient"
import { useIngredientName, useIngredients } from "../../../../services/Ingredient/service"
import { useRecipeByIngredient } from "../../../../services/Recipe/service"
import IngredientList from "../../../Ingredient/IngredientList"
import RecipeCard from "../../../Recipe/RecipeItem/RecipeCard"
import RecipeList from "../../../Recipe/RecipeList"
import Section from "../../../Section/Section"


const RecipeIngre = () => {
    const ingreName = useGetFetchQuery(['ingredientName'])
    const {isLoading, data} = useIngredients()
    // const {data: name} = useIngredientName()
    const {data: recipes} = useRecipeByIngredient()
    console.log(ingreName, recipes)
    if(isLoading){
        return <div>Loading</div>
    }
    const test = [{recipeId: 1}, {recipeId: 2}, {recipeId: 3}, {recipeId: 4},{recipeId: 5}]
    return (
        <Section>
            <div>
                <h4>Các nguyên liệu đang trong mùa</h4>
                <IngredientList ingredient={data} isActive={ingreName}/>
                <RecipeList recipes={recipes}/>
            </div>
        </Section>
    )
}

export default RecipeIngre
