import { Avatar, Card, Empty, Skeleton } from "antd"
import React, { Fragment } from "react"
import no_avatar from '../../../../assets/images/no_avatar.png'
import { useRecipe } from "../../../../services/RecipeList/service"
import { Link } from "react-router-dom"
import { DeleteOutlined } from "@ant-design/icons"
import useDetailBookMark from "./hooks/useDetailBookMark"
import ModalDelete from "../../../../components/ModalDelete"


type TDetailBookMark = {
    recipeListId: number
}

const { Meta } = Card

const DetailBookMark: React.FC<TDetailBookMark> = ({ recipeListId }) => {
    const { data, isLoading } = useRecipe(recipeListId)
    const {handleConfirmDelete, isLoading: deleteLoading, setRecipeId, setIsOpenModal, isOpenModal} = useDetailBookMark(recipeListId)
    return (
        <Fragment>
            {isLoading ? (
                <Skeleton active />
            ) : (data && Array.isArray(data) && data.length > 0) ?
                <Fragment>
                    <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-y-4 gap-x-1">
                        {data.map((item: Recipe.TRecipeDetailResponse) => {
                                const deleteIcon = <DeleteOutlined className='text-lg antd-card' onClick={() => {
                                    setRecipeId(item.recipeId)
                                    setIsOpenModal(true)
                                }}/>
                            return (

                                <Card
                                    hoverable
                                    className='ml-1 mr-1 mb-1'
                                    bodyStyle={{ padding: '12px' }}
                                    cover={
                                        <Link to={`/detail/${item.recipeId}`}>
                                            <img
                                                className='h-40 w-full object-cover'
                                                alt="example"
                                                src={item.image}
                                            />
                                        </Link>
                                    }
                                    actions={[
                                        deleteIcon
                                    ]}
                                >
                                    <Meta
                                        avatar={<Link to={`/user/${item.User.userId}`}><Avatar src={item.User.avatar ? item.User.avatar : no_avatar} /></Link>}
                                        title={<div className='w-[90%]'>
                                            <Link className='hover:text-black break-all' to={`/user/${item.User.userId}`}>{item.User.fullName}</Link>
                                        </div>}
                                        description={item.recipeName}
                                    />
                                </Card>
                            )})}
                    </div>
                </Fragment> :
                <Empty description={`Không có công thức`} />
            }
            <ModalDelete
        isLoading={deleteLoading}
        isDeleteModalOpen={isOpenModal}
        setIsDeleteModalOpen={setIsOpenModal}
        handleConfirm={handleConfirmDelete}
      />
        </Fragment>
    )
}

export default DetailBookMark