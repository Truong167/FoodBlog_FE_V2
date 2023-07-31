import React, { ChangeEvent, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popover } from 'antd';
import logo from '../../assets/images/logo2.png'
import { Link } from 'react-router-dom';
import { useSearch } from './hooks/useSearch';

const SearchContainer: React.FC = () => {
    const {handleChangeSearch, data, value} = useSearch()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const isValid = data && Array.isArray(data) && value
    const result = (
        <div>
            {isValid ? data.map((item, index) => {
                return (
                    <p className='py-1 pl-2 cursor-pointer hover:bg-[rgba(248,246,242,1)]' key={index}>{item.recipeName}</p>
                )
            }) : <p>Không có kết quả ....</p>}
        </div>
    )
    return (
        <div className='flex justify-center mt-3 w-full'>
            <div className='flex justify-center flex-col w-[50%] gap-8'>
                <div className='flex justify-center'>
                    <img src={logo} alt={logo} className='w-[40%]' />
                </div>
                <div className='w-full'>
                <Popover 
                    open={(value && isOpen) ? true : false} 
                    content={result} 
                    arrow={false} 
                    placement='bottom'
                    overlayStyle={{ width: 'calc(31%)', height: '100px' }}

                >
                    <Input 
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setIsOpen(false)}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeSearch(e)}
                        placeholder='Gõ vào tên công thức...'
                        prefix={<SearchOutlined />}
                        style={{caretColor: '#f93'}}
                        size='large'
                        className='focus hover caret-primary-1'
                        suffix={<Button className='btn-filled'>Tìm kiếm</Button>}
                    />
                </Popover>

                </div>
                <div className='flex justify-center gap-4'>
                    <Button className='btn-outlined' size='large'>Tìm kiếm bạn bè</Button>
                    <Button className='btn-outlined' size='large'>
                        <Link to={'/create-recipe'}>Viết món mới</Link>
                    </Button>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default SearchContainer;