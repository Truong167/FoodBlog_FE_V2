import React from 'react';
import { Dropdown, MenuProps, Skeleton } from 'antd';
import no_avatar from '../../assets/images/no_avatar.png'
import { Link } from 'react-router-dom';
import { useAvatarDropDown } from './hooks/useAvatarDropDown';


const AvatarDropDown: React.FC = () => {
  const {isLoading, data, logout} = useAvatarDropDown()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to={`/user/${data?.userId}`}>
          Xem trang cá nhân
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to={'/edit-profile'}>
          Chỉnh sửa thông tin
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to={'/change-password'}>
          Đổi mật khẩu
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <span onClick={logout}>
          Đăng xuất
        </span>
      ),
    },
  ];

  if(isLoading) {
    return <Skeleton.Button/>
  }
  return (
    <Dropdown overlayStyle={{position: 'fixed'}} menu={{items}} className='cursor-pointer'>
      <div className='flex justify-center items-center gap-2'>
        <img className='w-8 h-8 object-cover rounded-full' src={data.avatar ? data.avatar : no_avatar} alt='truong' />
        <span>{data.fullName}</span>
      </div>
    </Dropdown>
  )
};

export default AvatarDropDown;