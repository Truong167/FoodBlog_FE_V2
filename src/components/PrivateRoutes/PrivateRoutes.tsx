import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetFetchQuery } from '../../hooks/useGetQueryClient';
import { useAuth } from '../../services/Auth/service';

const PrivateRoutes = () => {
    const { data: isAuthenticated } = useAuth()
    console.log(isAuthenticated)
    const location = useLocation();
    return (
            !isAuthenticated
            ? <Navigate to={"/login"} state={{ from: location }} replace/>
            : <Outlet/>
    );
}

export default PrivateRoutes