import { fetcher } from "./api";

const BASE_URL = 'http://localhost/apicar';

export const AuthLogService = {
    login: async (token: string) => {
        return fetcher(BASE_URL, '/auth/login', 'GET', undefined, token)
    },
    logout: async (token: string) => {
        return fetcher(BASE_URL, '/auth/logout', 'GET', undefined, token)
    },
};