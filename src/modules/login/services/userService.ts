import { fetcher } from "../../../services/api";

interface RegisterData {
    user_nickname: string,
    user_email: string,
    user_password: string,
}

const BASE_URL = 'http://localhost/apilogin/user';

export const UserService = {
    emailUsed: async (email: string) => {
        return fetcher(BASE_URL, `/isEmailUsed?email=${email.trim()}`, 'GET')
    },
    create: async (data: RegisterData) => {
        console.log(data);
        return fetcher(BASE_URL, '/create', 'POST', data)
    }
};