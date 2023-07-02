
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import classes from './DefaultLayout.module.css'

interface Props {
    children: React.ReactNode;
    className?: string;
}

function DefaultLayout({ children, className }: Props) {
    return (
        <div className={classes.wrapper}>
            <Header/>
            <div className={classes.container}>
                <div className={`${classes.content} ${classes[`${className}`]}`}>{children}</div>
            </div>
            <Footer/>
        </div>
    );
}

export default DefaultLayout
