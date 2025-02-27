import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from '../../assets/car.png';
import SearchBar from "../../modules/cars/components/SearchBar";
import SearchResultList from "../../modules/cars/components/SearchResultList";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { TbGitCompare, TbLogin2, TbLogout } from "react-icons/tb";
import { FaCartFlatbed } from "react-icons/fa6";

export default function Header() {
    const { user, logout } = useAuth();
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
                <Link to={'/'}>
                    <div className={styles.logoContainer}>
                        <img src={logo} className={styles.logoImg}></img>
                    </div>
                </Link>
                <div className={styles.searchBarContainer}>
                    <SearchBar
                        setResults={setSearchResults}
                    ></SearchBar>
                    <SearchResultList
                        results={searchResults}
                    ></SearchResultList>
                </div>
            </div>
            <div className={styles.headerButtonContainer}>
                <nav className={styles.navbar}>
                    {user &&
                        <div className={styles.headerOption}>
                            <TbGitCompare />
                            <Link to={'/car/compare'}>Comparar</Link>
                        </div>
                        // <div className={styles.headerOption}>
                        //     <FaCartFlatbed />
                        //     <Link to={'/user/cart'} className={styles.headerOption}>Carrito</Link>
                        // </div>
                    }
                    <div className={styles.headerOption}>
                        {user ?
                            <Link to={'/'} onClick={() => logout()}><TbLogout />
                                Cerrar Sesión</Link> :
                            <><TbLogin2 />
                                <Link to={'/login'} className={styles.headerOption}>Iniciar Sesión</Link></>}
                    </div>
                </nav>
            </div>
        </div>
    );
};
