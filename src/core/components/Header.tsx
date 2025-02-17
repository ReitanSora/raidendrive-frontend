import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from '../../assets/car.png';
import SearchBar from "../../modules/cars/components/SearchBar";
import SearchResultList from "../../modules/cars/components/SearchResultList";
import { useState } from "react";
import { useLocation } from 'react-router-dom'
import { motion } from "motion/react";
import { useAuth } from "../../context/AuthContext";

export default function Header({ isVisible }) {

    const { user } = useAuth();
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className={`${styles.headerContainer} ${isVisible ? styles.blur : ""}`}>
            <div className={styles.headerLeft}>
                <Link to={'/'}>
                    <div className={styles.logoContainer}>
                        <img src={logo} className={styles.logoImg}></img>
                    </div>
                </Link>
                {/* <div className={styles.welcome}>
                    Bienvenido
                </div> */}
                <div className={styles.searchBarContainer}>
                    <SearchBar setResults={setSearchResults}></SearchBar>
                    <SearchResultList results={searchResults}></SearchResultList>
                </div>
            </div>
            <div className={styles.headerButtonContainer}>
                <nav className={styles.navbar}>
                    <Link to={'/car/compare'} className={styles.headerOption}>Comparar</Link>
                    {user && <Link to={'/user/cart'} className={`${styles.headerOption, location.pathname === '/car/compare' ? 'active' : ''}`}>Carrito</Link>}
                    {user? <a>Mi cuenta</a> : <Link to={'/login'} className={styles.headerOption}>Iniciar Sesión</Link>}
                </nav>
            </div>
        </div>
    );
};
