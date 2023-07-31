import { Input } from "antd"
import DefaultLayout from "../../components/layout/DefaultLayout/DefaultLayout"
import RecipeFollow from "../../components/layout/Recipe/RecipeFollow"
import RecipeIngre from "../../components/layout/Recipe/RecipeIngre"
import RecipePopular from "../../components/layout/Recipe/RecipePopular"
import { useIngredients } from "../../services/Ingredient/service"
import { useRecipeByIngredient } from "../../services/Recipe/service"
import SearchContainer from "../../components/Search/Search"


const HomePage = () => {
  return (
    <DefaultLayout className='width'>
      <SearchContainer/>
      <RecipeIngre/>
      <RecipeFollow/>
      <RecipePopular/>
    </DefaultLayout>
      
  )
}

export default HomePage