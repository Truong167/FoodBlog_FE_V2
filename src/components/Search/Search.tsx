import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import Search from 'antd/es/input/Search';


const SearchInput: React.FC = () => {
    
    return (
        <Search placeholder="input search text" allowClear />
    )
}

export default SearchInput;