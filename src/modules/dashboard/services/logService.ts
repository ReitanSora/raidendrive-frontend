import { fetcher } from "../../../services/api";

const BASE_URL = 'http://localhost/apicar/logs';

export const LogService = {
    findById: async (token: string, userId: string) => {
        return fetcher(BASE_URL, `?userId=${userId}`, 'GET', undefined, token)
    },
}