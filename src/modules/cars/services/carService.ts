import { fetcher } from "../../../services/api";

const BASE_URL = 'http://localhost/apicar/cars';

export const CarService = {
    findAll: async (token: string) => {
        return fetcher(BASE_URL, '', 'GET', undefined, token)
    },
    compare: async (selectedCar1: string, selectedCar2: string, token:string) => {
        return fetcher(BASE_URL, `/comparison?idCar1=${selectedCar1}&idCar2=${selectedCar2}`, 'GET', undefined, token)
    }
}