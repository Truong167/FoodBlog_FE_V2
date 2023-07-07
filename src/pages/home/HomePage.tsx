import DefaultLayout from "../../components/layout/DefaultLayout/DefaultLayout"
import RecipeFollow from "../../components/layout/Recipe/RecipeFollow"
import RecipeIngre from "../../components/layout/Recipe/RecipeIngre"
import RecipePopular from "../../components/layout/Recipe/RecipePopular"


const HomePage = () => {

  return (
    <DefaultLayout className='width'>
      <RecipeIngre/>
      <RecipeFollow/>
      <RecipePopular/>
    </DefaultLayout>
      
  )
}

export default HomePage