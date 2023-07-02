import { useRecipePopular } from "../../../../services/Recipe/service"
import RecipeList from "../../../Recipe/RecipeList"
import Section from "../../../Section/Section"


const RecipePopular = () => {
    const {isLoading, data: recipes} = useRecipePopular()
    if(isLoading){
        return <div>Loading</div>
    }
    return (
        <Section>
            <div>
                <h4>Công thức phổ biến trong tuần</h4>
                <RecipeList recipes={recipes}/>
            </div>
        </Section>
    )
}

export default RecipePopular
