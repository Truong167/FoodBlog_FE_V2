
import DefaultLayout from "../../components/layout/DefaultLayout/DefaultLayout"
import SearchContainer from "../../components/Search/Search"
import RecipeFollow from "./components/RecipeFollow"
import RecipeIngre from "./components/RecipeIngre"
import RecipePopular from "./components/RecipePopular"


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