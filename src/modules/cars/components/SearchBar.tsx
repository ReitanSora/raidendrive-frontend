import { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ setResults }) {

    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async (value) => {
        const res = await fetch('http://127.0.0.1:3000/cars')
        const response = await res.json();
        const results = response.filter((car) => {
            return value && car && car.brand && car.model && (
                car.brand.toLowerCase().includes(value.toLowerCase()) ||
                car.model.toLowerCase().includes(value.toLowerCase())
            );
        });
        setResults(results);

    };


    const handleChange = (value) => {
        setSearchTerm(value);
        fetchData(value);
    }

    return (
        <div className={styles.inputContainer}>
            <FaSearch id="search-icon" style={{ color: '#B3926B' }}></FaSearch>
            <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(newText) => handleChange(newText.target.value)}></input>
        </div>
    );
};
