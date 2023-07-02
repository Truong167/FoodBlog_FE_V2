
import { Navigate, useLocation } from "react-router-dom"
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterFrom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useAuth, useUser } from "../../services/Auth/service";


const Auth = ({ authRoute } : {authRoute: string}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { isLoading, data: isAuthenticated } = useAuth()
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(from)
  let type = authRoute === 'login' ? "Đăng nhập" : 'Đăng ký'
  let body
  console.log(isAuthenticated)
	if (isLoading)
		body = (
			<div className='d-flex justify-content-center mt-2'>
				<Spin indicator={antIcon} />;
			</div>
		)
	else if (isAuthenticated) {
    return <Navigate to={from} replace/>
  } 
  else {
    body = (
      <>
          {authRoute === 'login' && <LoginForm/>}
          {authRoute === 'register' && <RegisterForm/>}
  
      </>
    )
  }

  return (
      <div className='landing'>
        <div className='landing-inner'>
          <h2 style={{color: "white"}}>{type}</h2>
          <h5 style={{color: "white", marginBottom: '12px'}}>Để khám phá nhiều công thức mới</h5>
          {body}
        </div>
      </div>
  )
}

export default Auth