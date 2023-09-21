import { Link, useParams } from "react-router-dom"
import DefaultLayout from "../../components/layout/DefaultLayout/DefaultLayout"
import { useCommentsById, useRecipeById } from "../../services/Recipe/service"
import Loading from "../../components/Loading/Loading"
import Section from "../../components/Section/Section"
import Meta from "antd/es/card/Meta"
import { Avatar, Button } from "antd"
import { Fragment, useState } from "react"
import Ingredient from "./component/Ingredient/Ingredient"
import Step from "./component/Step/Step"
import { HeartFilled, HeartOutlined } from "@ant-design/icons"
import ReactPlayer from "react-player"
import CommentForm from "./component/CommentForm"
import useRecipeDetail from "./hooks/useRecipeDetail"
import { useUser } from "../../services/Auth/service"
import no_avatar from '../../assets/images/no_avatar.png'

const RecipeDetailPage = () => {
  const [showMore, setShowMore] = useState(false)
  const { id } = useParams()
  const { isLoading, data } = useRecipeById(id)
  const { data: comments } = useCommentsById(id)
  const {data: currentUser} = useUser()
  const { handleFollow, handleUnFollow, followLoading, unfollowLoading, handleLike, handleUnLike } =
    useRecipeDetail((data && data?.User && data.User?.userId) ? data.User.userId : '', id || '')
  if (isLoading) {
    return <Loading />
  }

  const isDescription = data.description && data.description.length > 100
  return (
    <DefaultLayout className="width1">
      {data.video && <ReactPlayer url={`${data.video}`} playing={true} controls={true} width='100%' height='100%' volume={0.1} />}
      <Section>
        <Fragment>
          <h3>{data.recipeName}</h3>
          <img src={`${data.image}`} className='w-full rounded-lg object-cover mt-3' alt={data.recipeName} />
        </Fragment>
      </Section>
      <Section>
        <Fragment>
          <Meta
            className="flex gap-4 mb-4"
            avatar={<Avatar className="h-12 w-12" src={data.User.avatar ? data.User.avatar : no_avatar} />}
            title={
              <div className="flex gap-4 items-center">
                <Link to={`/user/${data.User.userId}`}>{data.User.fullName}</Link>
                {currentUser?.userId !== data.User.userId && (
                  data.User.isFollow ?
                    <Button onClick={handleUnFollow} loading={unfollowLoading} size="middle" className="btn-filled">Đang theo dõi</Button> :
                    <Button onClick={handleFollow} loading={followLoading} size="middle" className="btn-outlined">Theo dõi</Button>
                )
                }
              </div>}
            description={`Hiện đang sống tại ${data.User.address}`}
          />
          {isDescription ? (showMore ?
            <p>{data.description} <span className="cursor-pointer font-bold" onClick={() => setShowMore(!showMore)}>Ẩn bớt</span></p> :
            <p>{data.description.substring(0, 100)}...<span className="cursor-pointer font-bold" onClick={() => setShowMore(!showMore)}>Xem thêm</span></p>)
            : <p>{data.description}</p>
          }
        </Fragment>
      </Section>
      <Ingredient amount={data.amount} preparationTime={data.preparationTime} cookingTime={data.cookingTime} DetailIngredients={data.DetailIngredients} />
      <Step Steps={data.Steps} />
      <Section>
        <Fragment>
          <div className="flex items-center gap-x-2 mb-3">
            <HeartOutlined className="text-2xl" />
            <h3>Phản ứng</h3>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2 bg-gray-200 px-2.5 py-1 rounded-md">
              {data.isFavorite ? <HeartFilled onClick={handleUnLike} style={{ color: 'red' }} /> : <HeartOutlined onClick={handleLike} />}
              {data.numberOfLikes}
            </div>
          </div>
        </Fragment>
      </Section>
      <Section>
        <CommentForm recipeId={id || ''} comments={comments}/>
      </Section>
    </DefaultLayout>
  )
}

export default RecipeDetailPage