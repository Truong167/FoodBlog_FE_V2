import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/Auth/service';

const PrivateRoutes = () => {
    const { data: isAuthenticated } = useAuth()
    const location = useLocation();
    return (
            !isAuthenticated
            ? <Navigate to={"/login"} state={{ from: location }} replace/>
            : <Outlet/>
    );
}

export default PrivateRoutes