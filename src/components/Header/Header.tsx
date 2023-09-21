import AvatarDropDown from '../AvatarDropDown/AvatarDropDown'
import styles from './Header.module.css'
import icon from "../../assets/images/logo.png";
import icon1 from "../../assets/images/logo1.png";
import {Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Fragment, useState } from 'react';
import { useUser } from '../../services/Auth/service';
import useViewport from '../../hooks/useViewPort';
import Mobile from './component/Mobile';

const Header = ({ type = 'normal', text, isLoading, form }: { text?: string, type?: string, isLoading?: boolean, form?: any }) => {
    const isEdit = type === 'normal' ? false : true
    const {isLoading: userLoading, data} = useUser()
    const {width: deviceWidth} = useViewport()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const isValid = !userLoading && data
    return (
        <header className={styles.header}>
            {isValid && <Mobile isOpen={isOpen} setIsOpen={setIsOpen} userId={data.userId} fullName={data.fullName}/>}
            <div className={styles.container}>
                <div
                    className={styles.flex}
                >
                    <div className={styles.left}>
                        <Link to="/" style={{ display: 'flex' }}>
                            <img src={icon} className={styles.image1} alt="icon" />
                            <img src={icon1} className={styles.image2} alt="name" />
                        </Link>
                    </div>
                    {isEdit ?
                        <Button loading={isLoading} onClick={() => form.submit()} className='bg-primary-1 text-white btn-filled'>{text}</Button>
                        :
                        (
                            <div className='flex justify-center items-center gap-7'>
                                {deviceWidth < 476 ? 
                                    <Fragment>
                                        {!userLoading && data && data.avatar && <img onClick={() => setIsOpen(true)} className='w-8 h-8 object-cover rounded-full' src={data.avatar} alt='avatar'/>}
                                    </Fragment>
                                    :
                                    <Fragment>

                                        <Link to={'/create-recipe'} className='flex justify-center items-center gap-1 hover:text-primary-1 ease-in-out'>
                                            <PlusOutlined />
                                            Viết món mới
                                        </Link>
                                        <AvatarDropDown />
                                    </Fragment>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header