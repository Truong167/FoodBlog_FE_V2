import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetFetchQuery } from '../../hooks/useGetQueryClient';

const PrivateRoutes = () => {
    const isAuthenticated = useGetFetchQuery(['isAuthenticated'])
    console.log(isAuthenticated)
    const location = useLocation();
    return (
            !isAuthenticated
            ? <Navigate to={"/login"} state={{ from: location }} replace/>
            : <Outlet/>
    );
}

export default PrivateRoutes