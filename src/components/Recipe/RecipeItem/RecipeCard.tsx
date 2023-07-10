import React from 'react';
import { EditOutlined, HeartOutlined, HeartFilled, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { imageUrl } from '../../../utils/constant';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const RecipeCard: React.FC<Recipe.TRecipeResponse> = ({ User, date, recipeId, image, isFavorite, recipeName, numberOfLikes }) => {
  const heartIcon = <div className='flex justify-center gap-2 items-center'>
    <p>{numberOfLikes}</p>
    {isFavorite ? <HeartFilled key="like" style={{color: 'red'}}/> : <HeartOutlined key="like" />}
  </div>
  return (
    <Card
      // style={{ width: 300 }}
      className='ml-1 mr-1'
      bodyStyle={{padding: '12px'}}
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
        <EditOutlined key="edit" />,
      ]}
    >
      <Meta
        avatar={<Avatar src={`${imageUrl}/${User.avatar}`} />}
        title={User.fullName}
        description={recipeName}
      />
    </Card>

  )

}


export default RecipeCard;