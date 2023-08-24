import { axiosClient as axios } from "./AxiosClient";

export const getResources = (page, limit, type) => axios.get(`/admin/${type}`, { params: { page, limit } });

export const getResource = (id, type) => axios.get(`/admin/${type}/${id}`);

export const saveResource = (fields, type) => axios.post(
    `/admin/${type}`,
    { ...fields },
    { headers: { 'Content-Type': 'multipart/form-data' } }
);

export const editResource = (fields, type, id) => axios.patch(`/admin/${type}/${id}`, { ...fields });

export const deleteResources = (type, ids) => axios.delete(`/admin/${type}`, { params: { ids } } );

export const sendPromoEmail = mailContents => axios.post('/admin/send-promotional-email', { ...mailContents });