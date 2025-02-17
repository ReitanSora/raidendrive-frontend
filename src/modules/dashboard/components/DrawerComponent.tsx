import {
    Divider,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
} from "@heroui/react";
import { AiOutlineControl, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from './DrawerComponent.module.css';

export default function DrawerComponent({isOpen, onOpenChange}) {
    
    return (
        <Drawer
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="xs"
            placement="left"
            closeButton={
                <div
                    style={{
                        width: '40px',
                        height: '40px',
                        background: '#363636',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        outline: 'none',
                        cursor: 'pointer'
                    }}>
                    <AiOutlineClose size={36} color="#f2f2f2" />
                </div>
            }
            motionProps={{
                variants: {
                    enter: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        x: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                },
            }}
        >
            <DrawerContent className={styles.drawer}>
                    <DrawerHeader className={styles.drawerHeader}>
                        <AiOutlineControl size={24} />
                        Administración
                    </DrawerHeader>
                    <DrawerBody className={styles.drawerBody}>
                        <Link to={'/admin/users'}>
                            <div className={styles.optionContainer}>
                                Usuarios
                            </div>
                        </Link>
                        <Divider orientation="horizontal" className={styles.divider} />
                        <Link to={'/admin/cars'}>
                            <div className={styles.optionContainer}>
                                Autos
                            </div>
                        </Link>
                        <Divider orientation="horizontal" className={styles.divider} />
                        <Link to={'/admin/dashboard'}>
                            <div className={styles.optionContainer}>
                                Reportes
                            </div>
                        </Link>
                    </DrawerBody>
                </DrawerContent>
        </Drawer>
    );
};
