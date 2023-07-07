import AvatarDropDown from '../AvatarDropDown/AvatarDropDown'
import styles from './Header.module.css'
import icon from "../../assets/images/logo.png";
import icon1 from "../../assets/images/logo1.png";
import { Link } from 'react-router-dom';
import SearchInput from '../Search/Search';
import { PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div
                    className={styles.content}
                >
                    <div className={styles.left}>
                        <Link to="/" style={{display: 'flex'}}>
                            <img src={icon} className={styles.image1} alt="icon" />
                            <img src={icon1} className={styles.image2} alt="name" />
                        </Link>
                    </div>
                    <SearchInput/>
                    <Link to={'/create-recipe'} className='flex justify-center items-center gap-1'>
                    <PlusOutlined/>
                    Viết món mới
                    </Link>
                    <AvatarDropDown/>
                </div>
            </div>
        </header>
    )
}

export default Header