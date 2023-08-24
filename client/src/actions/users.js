import * as api from "../api/admin";
import { appendUsers } from "../state/dataSlice";

// Todo(proslijedi historiju za login)
export const getUsers = (page, limit) => async dispatch => {

    try {
        const { data: { resources: users, total } } = await api.getResources(page, limit, 'users');

        dispatch(appendUsers({ users }));

        return { total };
    }
    catch (error) {
        console.error(error.message);
    }
};



export const getUser = id => async dispatch => {

    const response = await api.getResource(id, 'users');
    const user = response?.data?.resource;

    if (!user) return;

    dispatch(appendUsers({ users: [user] }));
};

