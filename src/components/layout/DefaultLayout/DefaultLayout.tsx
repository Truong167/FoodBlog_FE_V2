
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import classes from './DefaultLayout.module.css'

interface Props {
    children: React.ReactNode;
    className?: string;
    type?: string
    text?: string
    form?: any
    isLoading?: boolean
}

function DefaultLayout({ children, className, type, text, form, isLoading }: Props) {
    return (
        <div className={classes.wrapper}>
            <Header type={type} text={text} form={form} isLoading={isLoading}/>
            <div className={classes.container}>
                <div className={`${classes.content} ${classes[`${className}`]}`}>{children}</div>
            </div>
            <Footer/>
        </div>
    );
}

export default DefaultLayout
