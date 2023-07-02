import React from 'react';
import { Dropdown, Skeleton } from 'antd';
import { imageUrl } from '../../utils/constant';
import { useUser } from '../../services/Auth/service';


const AvatarDropDown: React.FC = () => {
  const { isLoading, data } = useUser()
  if(isLoading) {
    return <Skeleton.Button  />
  }
  return (
    <Dropdown>
      <div className='flex justify-center items-center gap-2'>
        <img className='w-8 h-8 object-cover rounded-full' src={`${imageUrl}/${data.avatar}`} alt='truong' />
        <span>{data.fullName}</span>
      </div>
    </Dropdown>
  )
};

export default AvatarDropDown;