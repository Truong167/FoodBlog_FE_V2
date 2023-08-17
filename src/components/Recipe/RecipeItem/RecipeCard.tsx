import React, { Fragment, useState } from 'react';
import { HeartOutlined, HeartFilled, SaveOutlined, EllipsisOutlined, LockOutlined, GlobalOutlined } from '@ant-design/icons';
import { Avatar, Card, Dropdown, MenuProps } from 'antd';
import no_avatar from '../../../assets/images/no_avatar.png'
import { Link } from 'react-router-dom';
import { useDelete } from './hooks/useRecipeCard';
import ModalDelete from '../../ModalDelete';
import ModalPrivacy from './components/ModalPrivacy';
import ModalRecipeList from './components/ModalRecipeList';

const { Meta } = Card;

const RecipeCard: React.FC<Recipe.TRecipeResponse> = ({ User, status, date, recipeId, image, isFavorite, recipeName, numberOfLikes, isMyRecipe }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isRecipeListModalOpen, setIsRecipeListModalOpen] = useState<boolean>(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false)
  const { handleConfirm, isLoading, handleLikeRecipe, handleDislikeRecipe, bookmarkList, bookmarkListLoading } = useDelete(recipeId, setIsDeleteModalOpen)
  const isValid = !bookmarkListLoading && bookmarkList && Array.isArray(bookmarkList)
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
    {isFavorite ? <HeartFilled key="like" className='text-lg' style={{ color: 'red' }} onClick={handleDislikeRecipe} /> : <HeartOutlined className='text-lg' key="like" onClick={handleLikeRecipe} />}
  </div>
  const actionIcon = isMyRecipe ?
    <Dropdown menu={{ items }}>
      <EllipsisOutlined className='text-lg antd-card' key="edit" />
    </Dropdown> : <SaveOutlined className='text-lg antd-card' onClick={() => setIsRecipeListModalOpen(true)} />
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
              src={image}
            />
          </Link>
        }
        actions={[
          heartIcon,
          actionIcon
        ]}
      >
        <Meta
          avatar={<Link to={`/user/${User.userId}`}><Avatar src={User.avatar ? User.avatar : no_avatar} /></Link>}
          title={<div className='flex flex-col'>
            <Link className='hover:text-black' to={`/user/${User.userId}`}>{User.fullName}</Link>
          </div>}
          description={<div className='flex gap-2 items-center'>
            {status === 'CK' ? <GlobalOutlined className="text-sm" /> : <LockOutlined className="text-sm" />}
            <span>{recipeName}</span>
          </div>}
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
      {isValid &&
        <ModalRecipeList
          recipeId={recipeId}
          isRecipeListModalOpen={isRecipeListModalOpen}
          setIsRecipeListModalOpen={setIsRecipeListModalOpen}
          bookmarkList={bookmarkList}
        />
      }
    </Fragment>

  )

}


export default RecipeCard;