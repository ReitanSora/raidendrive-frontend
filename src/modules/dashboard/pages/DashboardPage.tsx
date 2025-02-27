import { Link, useOutletContext } from "react-router-dom";
import styles from './DashboardPage.module.css';
import {
    Divider,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    useDisclosure,
} from "@heroui/react";
import { AiOutlineControl, AiOutlineClose } from "react-icons/ai";
import { useAuth } from '../../../context/AuthContext';
import useTitle from '../../../hooks/useTitle';
import HeaderDashboard from "../components/HeaderDashboard";
import { useEffect, useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaCar, FaUsers } from "react-icons/fa";
import { TbActivity } from "react-icons/tb";
import { UserService } from "../services/userService";
import DrawerComponent from "../components/DrawerComponent";
import { CarService } from "../services/carService";

export default function DashboardPage(params) {
    useTitle('RaidenDrive - Dashboard');
    const context = useOutletContext();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { token, logout } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date())
    const [usersCount, setUsersCount] = useState(0);
    const [carsCount, setCarsCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(interval)
    }, []);

    useEffect(() => {
        const countUsers = async () => {
            try {
                const users = await UserService.findAll(token);
                const cars = await CarService.findAll(token);
                setCarsCount(cars.length);
                setUsersCount(users.length);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error)
                }
            }
        };

        countUsers();
    }, []);

    return (
        <div className={styles.mainContainer}>
            <HeaderDashboard context={context} onOpen={onOpen} logout={logout}></HeaderDashboard>
            <DrawerComponent isOpen={isOpen} onOpenChange={onOpenChange}></DrawerComponent>
            <div className={styles.contentContainer}>
                <div className={styles.info}>
                    <div className={styles.date}>
                        <span>{currentDate.toDateString()}</span>
                        <Divider orientation="vertical" className={styles.divider}></Divider>
                        <span>{currentDate.toLocaleTimeString()}</span>
                    </div>
                    <div className={styles.welcome}>
                        <MdAdminPanelSettings />
                        <span>
                            Bienvenido, {context.username}
                        </span>
                    </div>
                </div>
                <div className={styles.summary}>
                    <div className={styles.summaryElement}>
                        <FaUsers />
                        <span>{`${usersCount} Usuarios registrados`}</span>
                    </div>
                    <div className={styles.summaryElement}>
                        <FaCar />
                        <span>{`${carsCount} Autos a la venta`}</span>
                    </div>
                </div>
                <div className={styles.recentActivity}>
                    <div className={styles.recentActivityHeader}>
                        <TbActivity />
                        <span>Actividad reciente</span>
                    </div>
                    <Divider orientation="horizontal" className={styles.divider} />
                    <div className={styles.recentActivityContent}>
                        <div className={styles.element}>
                            <span>ESLC ha iniciado sesión a las 15:00.</span>
                            <Divider orientation="horizontal" className={styles.divider} />
                        </div>
                        <div className={styles.element}>
                            <span>ESLC ha iniciado sesión a las 15:00.</span>
                            <Divider orientation="horizontal" className={styles.divider} />
                        </div>
                        <div className={styles.element}>
                            <span>ESLC ha iniciado sesión a las 15:00.</span>
                            <Divider orientation="horizontal" className={styles.divider} />
                        </div>
                        <div className={styles.element}>
                            <span>ESLC ha iniciado sesión a las 15:00.</span>
                            <Divider orientation="horizontal" className={styles.divider} />
                        </div>
                        <div className={styles.element}>
                            <span>ESLC ha iniciado sesión a las 15:00.</span>
                            <Divider orientation="horizontal" className={styles.divider} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
