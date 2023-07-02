import React from 'react'
import classes from './Footer.module.css'
import footer from '../../assets/images/footer.png'


const Footer = () => {

  return (
    <footer className={classes.footer}>
    <div className={classes.container}>
      <div>
        <h3>Về Cookpad</h3>
        <p>Sứ mệnh của Cookpad là làm cho việc vào bếp vui hơn mỗi ngày, vì chúng tôi tin rằng nấu nướng là chìa khoá cho một cuộc sống hạnh phúc hơn và khoẻ mạnh hơn cho con người, cộng đồng, và hành tinh này. Chúng tôi muốn hỗ trợ các đầu bếp gia đình trên toàn thế giới để họ có thể giúp đỡ nhau qua việc chia sẻ các món ngon và bí quyết nấu ăn của mình.</p>
      </div>
    </div>
    <img src={footer} alt='footer' className={classes.img}/>
  </footer>
  )
}

export default Footer