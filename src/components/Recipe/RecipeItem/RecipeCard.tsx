import React, { Fragment, useState } from 'react';
import { EditOutlined, HeartOutlined, HeartFilled, SaveOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Dropdown, MenuProps, Modal } from 'antd';
import { imageUrl } from '../../../contants/constant';
import { Link } from 'react-router-dom';
import { useDelete } from './hooks/useRecipeCard';
import ModalDelete from './components/ModalDelete';
import ModalPrivacy from './components/ModalPrivacy';

const { Meta } = Card;

const RecipeCard: React.FC<Recipe.TRecipeResponse> = ({ User, status, date, recipeId, image, isFavorite, recipeName, numberOfLikes, isMyRecipe }) => {
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
        <p onClick={() => setIsPrivacyModalOpen(true)}>
          Chỉnh sửa quyền riêng tư
        </p>
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
        hoverable
        className='ml-1 mr-1 mb-1'
        bodyStyle={{ padding: '12px' }}
        cover={
          <Link to={`/detail/${recipeId}`}>
            <img
              className='h-40 w-full object-cover'
              alt="example"
              src={`${image}`}
            />
          </Link>
        }
        actions={[
          heartIcon,
          actionIcon
        ]}
      >
        <Meta
          avatar={<Link to={`/user/${User.userId}`}><Avatar src={`${User.avatar}`} /></Link>}
          title={<Link className='hover:text-black' to={`/user/${User.userId}`}>{User.fullName}</Link>}
          description={recipeName}
        />
      </Card>
        <ModalDelete
          isLoading={isLoading}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleConfirm={handleConfirm}
        />
        <ModalPrivacy
          recipeId={recipeId}
          status={status}
          isPrivacyModalOpen={isPrivacyModalOpen}
          setIsPrivacyModalOpen={setIsPrivacyModalOpen}
        />
    </Fragment>

  )

}


export default RecipeCard;