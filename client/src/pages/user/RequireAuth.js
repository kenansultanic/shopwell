import { useSelector } from "react-redux";
import { selectCurrentAccessToken } from "../../state/authSlice";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = () => {

    const accessToken = localStorage.getItem('accessToken');
    const location = useLocation();

    return (
        accessToken
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;