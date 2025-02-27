import { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { CarService } from "../services/carService";

export default function SearchBar({ setResults }) {

    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async (value) => {
        try {
            const response = await CarService.findAll(value);
            const results = response.filter((car) => {
                return value && car && car.brand && car.model && (
                    car.brand.toLowerCase().includes(value.toLowerCase()) ||
                    car.model.toLowerCase().includes(value.toLowerCase())
                );
            });
            setResults(results);
        } catch (error) {
            setResults('');
        }
    };


    const handleChange = (value) => {
        fetchData(value);
        setSearchTerm(value);
    }

    return (
        <div className={styles.inputContainer}>
            <FaSearch id="search-icon" style={{ color: '#B3926B' }}></FaSearch>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(newText) => handleChange(newText.target.value)}></input>
        </div>
    );
};
