import logo from '../../../assets/car.png';
import styles from './HeaderDashboard.module.css';
import { TbMenu2, TbLogout } from "react-icons/tb";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function HeaderDashboard({ context, onOpen, logout }) {
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <Link to={'/admin/dashboard'}>
                    <div className={styles.logoContainer}>
                        <img src={logo} alt="logo"></img>
                    </div>
                </Link>
                <div className={styles.optionsContainer}>
                    <div onClick={onOpen}>
                        <TbMenu2/>
                        Menu
                    </div>
                </div>
                {/* <div className={styles.searchContainer}>
                    <span>Buscar...</span>
                </div> */}
            </div>
            <div className={styles.headerRight}>

                <div className={styles.welcome}>
                    <MdAdminPanelSettings/>
                    Bienvenido {context.username}
                </div>
                <div className={styles.optionsContainer}>
                    <div onClick={() => {
                        onOpen();
                        logout();
                    }}>
                        <TbLogout/>
                        Cerrar Sesión
                    </div>
                </div>
            </div>
        </div>
    );
};
