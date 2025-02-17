import { fetcher } from "../../../services/api";

const BASE_URL = 'http://127.0.0.1:8080/user';

export const UserService = {
    findAll: async (token: string) => {
        return fetcher(BASE_URL, '/find', 'GET', undefined, token)
    },
    edit: async(id: string, rol: string, token: string) => {
        console.log(id)
        console.log(rol)
        console.log(token)
        return fetcher(BASE_URL, `/edit/${id}`, 'PUT', {"user_role": rol}, token)
    },
    delete: async (id: string, token: string) => {
        return fetcher(BASE_URL, `/delete/${id}`, 'DELETE', undefined, token)
    },
};