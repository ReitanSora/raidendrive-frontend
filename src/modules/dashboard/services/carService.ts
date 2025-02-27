import { fetcher } from "../../../services/api";

const BASE_URL = 'http://localhost/apicar/cars';

export const CarService = {
    findAll: async (token: string) => {
        return fetcher(BASE_URL, '', 'GET', undefined, token)
    },
    create: async (data: object, region: string, country: string, token: string) => {
        return fetcher(BASE_URL, `?region=${region.toLowerCase()}&country=${country.toLowerCase()}`, 'POST', data, token)
    },
    edit: async (id: string, data: object, token: string) => {
        return fetcher(BASE_URL, `/${id}`, 'PATCH', data, token)
    },
    delete: async (id: string, token: string) => {
        return fetcher(BASE_URL, `/${id}`, 'DELETE', undefined, token)
    },
}