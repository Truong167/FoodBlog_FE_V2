import { useParams } from 'react-router-dom'
import EditRecipeForm from './components/EditRecipeForm/EditRecipeForm'
import { useRecipeById } from '../../services/Recipe/service'

const EditRecipePage = () => {
  const {id} = useParams()
  const {data, isLoading} = useRecipeById(id)
  console.log(id)
  if(isLoading) {
    return <>loading</>
  }

  return (
    <EditRecipeForm data={data} recipeId={id ? id : ''}/>
  )
}

export default EditRecipePage
