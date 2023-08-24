import {Outlet, Navigate} from "react-router";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../state/authSlice";
import {useEffect} from "react";

const UserLayout = () => {

    const user = useSelector(selectCurrentUser);

    return (
        user.type !== 'admin'
            ? <Outlet />
            : <Navigate to="login" />
    );
};

export default UserLayout;