import React from 'react';
import { Dropdown, MenuProps, Skeleton } from 'antd';
import { imageUrl } from '../../utils/constant';
import { useUser } from '../../services/Auth/service';


const AvatarDropDown: React.FC = () => {
  const { isLoading, data } = useUser()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

  if(isLoading) {
    return <Skeleton.Button  />
  }
  return (
    <Dropdown overlayStyle={{position: 'fixed'}} menu={{items}} className='cursor-pointer'>
      <div className='flex justify-center items-center gap-2'>
        <img className='w-8 h-8 object-cover rounded-full' src={`${imageUrl}/${data.avatar}`} alt='truong' />
        <span>{data.fullName}</span>
      </div>
    </Dropdown>
  )
};

export default AvatarDropDown;