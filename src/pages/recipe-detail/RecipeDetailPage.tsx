import { Link, useParams } from "react-router-dom"
import DefaultLayout from "../../components/layout/DefaultLayout/DefaultLayout"
import { useCommentsById, useRecipeById } from "../../services/Recipe/service"
import Loading from "../../components/Loading/Loading"
import Section from "../../components/Section/Section"
import { imageUrl } from "../../contants/constant"
import Meta from "antd/es/card/Meta"
import { Avatar } from "antd"
import { Fragment, useState } from "react"
import Ingredient from "./component/Ingredient/Ingredient"
import Step from "./component/Step/Step"
import { CommentOutlined, EllipsisOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons"
import no_avatar from '../../assets/images/no_avatar.png'
import { formatDate } from "../../utils/format-time"
import styles from './RecipeDetailPage.module.css'
import ReactPlayer from "react-player"
import { useForm } from "react-hook-form"
import FormItem from "../../components/UI/FormItem"
import InputText from "../../components/UI/Input/Input"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import CommentForm from "./component/CommentForm"


const RecipeDetailPage = () => {
  const [showMore, setShowMore] = useState(false)
  const { id } = useParams()
  const { isLoading, data } = useRecipeById(id)
  const { data: comments } = useCommentsById(id)

  console.log(comments)
  if (isLoading) {
    return <Loading />
  }
  const isDescription = data.description && data.description.length > 100
  return (
    <DefaultLayout className="width1">
      <ReactPlayer url={`${data.video.url}`} playing={true} controls={true} width='100%' height='100%' />
      <Section>
        <Fragment>
          <h3>{data.recipeName}</h3>
          <img src={`${data.image.url}`} className='w-full rounded-lg object-cover mt-3' alt={data.recipeName} />
        </Fragment>
      </Section>
      <Section>
        <Fragment>
          <Meta
            className="flex gap-4 mb-4"
            avatar={<Avatar className="h-12 w-12" src={`${imageUrl + data.User.avatar}`} />}
            title={data.User.fullName}
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
              {data.isFavorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
              {data.numberOfLikes}
            </div>
          </div>
        </Fragment>
      </Section>
      <Section>
        <Fragment>
          <div className="flex items-center gap-x-2 mb-3">
            <CommentOutlined className="text-2xl" />
            <h3>Tất cả bình luận</h3>
          </div>
          <h6>Tất cả tương tác ({comments && comments.commentCount})</h6>
          <div className={styles.comment}>
            {comments && comments.comment.length > 0 ? (
              comments.comment.map((item: any) => {
                return (
                  <div className="flex" key={item.id}>
                    <Meta
                      className="flex gap-4 mb-4 w-full"
                      avatar={<Avatar className="h-12 w-12" src={`${item.User.avatar
                        ? imageUrl + item.User.avatar
                        : no_avatar
                        }`} />}
                      title={<h6>{item.User.fullName + " " + formatDate(item.date)}</h6>}
                      description={item.comment}
                    />
                      {item.isMyComment && <EllipsisOutlined className="text-2xl  cursor-pointer" />}
                  </div>
                );
              })
            ) : (
              <h3>Chưa có bình luận nào</h3>
            )}
          </div>
          <CommentForm recipeId={id || ''}/>
        </Fragment>
      </Section>
    </DefaultLayout>
  )
}

export default RecipeDetailPage