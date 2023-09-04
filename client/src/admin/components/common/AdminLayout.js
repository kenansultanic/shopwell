import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../state/authSlice";
import { Navigate, Outlet } from "react-router";

const AdminLayout = () => {

    const user = useSelector(selectCurrentUser);

    return (
        user?.isAdmin
            ? <Outlet />
            : <Navigate to="../login" />
    );
};

export default AdminLayout;