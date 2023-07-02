import { useParams } from "react-router-dom"
import DefaultLayout from "../components/layout/DefaultLayout/DefaultLayout"
import { useRecipeById } from "../services/Recipe/service"
import Loading from "../components/Loading/Loading"
import Section from "../components/Section/Section"
import { imageUrl } from "../utils/constant"
import Meta from "antd/es/card/Meta"
import { Avatar } from "antd"


const RecipeDetailPage = () => {
    const { id } = useParams()
    const {isLoading, data} = useRecipeById(id)
    console.log(data)
    if(isLoading){
        return <Loading/>
    }
  return (
    <DefaultLayout className="width1">
        <img src={`${imageUrl + data.image}`} className='w-full rounded-lg object-cover mt-3' alt={data.recipeName}/>
        <Section>
            <h3>{data.recipeName}</h3>
        </Section>
        <Section>
            <Meta
                className="flex gap-4"
                avatar={<Avatar className="h-12 w-12" src={`${imageUrl + data.User.avatar}`} />}
                title={data.User.fullName}
                description={`Hiện đang sống tại ${data.User.address}`}
            />
        </Section>
    </DefaultLayout>
  )
}

export default RecipeDetailPage