import React, { Fragment, useState } from 'react';
import { EditOutlined, HeartOutlined, HeartFilled, SaveOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Dropdown, MenuProps, Modal } from 'antd';
import { imageUrl } from '../../../contants/constant';
import { Link } from 'react-router-dom';
import { useDelete } from './hooks/useRecipeCard';
import ModalDelete from './components/ModalDelete';

const { Meta } = Card;

const RecipeCard: React.FC<Recipe.TRecipeResponse> = ({ User, date, recipeId, image, isFavorite, recipeName, numberOfLikes, isMyRecipe }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false)
 const {handleConfirm, isLoading, handleLikeRecipe, handleDislikeRecipe} = useDelete(recipeId, setIsDeleteModalOpen)
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to={`/edit-recipe/${recipeId}`}>
          Sửa công thức
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={() => setIsDeleteModalOpen(true)}>
          Xóa công thức
        </p>
      ),
    },
    {
      key: '3',
      label: (
        <Link to={'/edit-profile'}>
          Chỉnh sửa quyền riêng tư
        </Link>
      ),
    },
  ];
  const heartIcon = <div className='antd-card flex justify-center gap-2 items-center'>
    <p>{numberOfLikes}</p>
    {isFavorite ? <HeartFilled key="like" className='text-lg' style={{ color: 'red' }} onClick={handleDislikeRecipe} /> : <HeartOutlined className='text-lg' key="like" onClick={handleLikeRecipe}/>}
  </div>
  const actionIcon = isMyRecipe ?
    <Dropdown menu={{ items }}>
      <EllipsisOutlined className='text-lg antd-card' key="edit" />
    </Dropdown> : <SaveOutlined className='text-lg antd-card' />
  return (
    <Fragment>
      <Card
        className='ml-1 mr-1'
        bodyStyle={{ padding: '12px' }}
        cover={
          <Link to={`/detail/${recipeId}`}>
            <img
              className='h-40 w-80 object-cover'
              alt="example"
              src={`${imageUrl}/${image}`}
            />
          </Link>
        }
        actions={[
          heartIcon,
          actionIcon
        ]}
      >
        <Meta
          avatar={<Avatar src={`${imageUrl}/${User.avatar}`} />}
          title={User.fullName}
          description={recipeName}
        />
      </Card>
        <ModalDelete
          isLoading={isLoading}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleConfirm={handleConfirm}
        />
    </Fragment>

  )

}


export default RecipeCard;