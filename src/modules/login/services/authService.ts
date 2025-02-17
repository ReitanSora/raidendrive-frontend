import { fetcher } from "../../../services/api";

interface LoginData {
    email: string,
    password: string,
}

const BASE_URL = 'http://127.0.0.1:8080/auth';

export const AuthService = {
    login: async (data: LoginData) => {
        return fetcher(BASE_URL, '/login', 'POST', data)
    },
    secured: async (token: string) => {
        return fetcher(BASE_URL, '/secured', 'GET', undefined, token)
    },
};