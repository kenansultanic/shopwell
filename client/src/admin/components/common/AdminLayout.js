import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../state/authSlice";
import { Navigate, Outlet } from "react-router";

const AdminLayout = () => {

    const user = useSelector(selectCurrentUser);
    console.log(user)

    return (
        //TODO(izmjeni u ===)
        user.type !== 'admin'
            ? <Outlet />
            : <Navigate to="./login" />
    );
};

export default AdminLayout;