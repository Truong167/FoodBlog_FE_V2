import classes from './Section.module.css'

const Section = ({children}: {children: JSX.Element}) => {

    return (
      <div className={classes.container}>
        {children}
    </div>
    )
  }
  
  export default Section