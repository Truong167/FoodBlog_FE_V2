import { useGetFetchQuery } from "../../../../hooks/useGetQueryClient"
import { useSetQuery } from "../../../../hooks/useSetQueryClient"
import { useIngredientName, useIngredients } from "../../../../services/Ingredient/service"
import { useRecipeByFollow, useRecipeByIngredient } from "../../../../services/Recipe/service"
import IngredientList from "../../../Ingredient/IngredientList"
import RecipeCard from "../../../Recipe/RecipeItem/RecipeCard"
import RecipeList from "../../../Recipe/RecipeList"
import Section from "../../../Section/Section"


const RecipeFollow = () => {
    const {isLoading, data: recipes} = useRecipeByFollow()
    if(isLoading){
        return <div>Loading</div>
    }
    return (
        <Section>
            <div>
                <h4>Công thức mới từ người mà bạn theo dõi</h4>
                <RecipeList recipes={recipes}/>
            </div>
        </Section>
    )
}

export default RecipeFollow
