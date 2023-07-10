import AvatarDropDown from '../AvatarDropDown/AvatarDropDown'
import styles from './Header.module.css'
import icon from "../../assets/images/logo.png";
import icon1 from "../../assets/images/logo1.png";
import { Link } from 'react-router-dom';
import SearchInput from '../Search/Search';
import { PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Fragment } from 'react';

const Header = ({ type = 'normal', text }: { text?: string, type?: string }) => {
    const className = type === 'normal' ? 'grid' : 'flex'
    const isEdit = type === 'normal' ? false : true
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div
                    className={styles[`${className}`]}
                >
                    <div className={styles.left}>
                        <Link to="/" style={{ display: 'flex' }}>
                            <img src={icon} className={styles.image1} alt="icon" />
                            <img src={icon1} className={styles.image2} alt="name" />
                        </Link>
                    </div>
                    {isEdit ?
                        <Button className='bg-primary-1 text-white btn-filled'>{text}</Button>
                        :
                        (
                            <Fragment>
                                <SearchInput />
                                <Link to={'/create-recipe'} className='flex justify-center items-center gap-1 hover:text-primary-1 ease-in-out'>
                                    <PlusOutlined />
                                    Viết món mới
                                </Link>
                                <AvatarDropDown />
                            </Fragment>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header