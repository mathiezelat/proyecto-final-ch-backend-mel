import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    return useContext(AuthContext);
}

const RequireAuth = () => {
    const auth = useAuth();
    let location = useLocation();

    if (!auth.isLoggedUser()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}


export default RequireAuth