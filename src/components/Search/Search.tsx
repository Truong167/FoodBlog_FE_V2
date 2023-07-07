import React from 'react';
import { CloseCircleOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Input, message, Space } from 'antd';
import Search from 'antd/es/input/Search';
import styles from './Search.module.css'


const SearchInput: React.FC = () => {
    
    return (
        <div className={styles.search}>
                <button className={styles["btn-search"]}><SearchOutlined /></button>
                <input 
                    type="text" 
                    placeholder='Gõ vào tên công thức...'
                    // ref={inputRef}
                    // value={searchValue}
                    // onChange={handleChange}
                    // onFocus={() => setShowResult(true)}
                />
                <button className={styles.clear} >
                    <CloseCircleOutlined />
                </button>
            </div>
    )
}

export default SearchInput;