import { fetcher } from "../../../services/api";

interface LoginData {
    email: string,
    password: string,
}

const BASE_URL = 'http://localhost/apilogin/auth';

export const AuthService = {
    login: async (data: LoginData) => {
        return fetcher(BASE_URL, '/login', 'POST', data)
    },
    secured: async (token: string) => {
        return fetcher(BASE_URL, '/secured', 'GET', undefined, token)
    },
};