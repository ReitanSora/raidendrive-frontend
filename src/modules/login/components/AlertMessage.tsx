import { Alert } from '@heroui/react';
import styles from './AlertMessage.module.css';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TbAlertHexagonFilled, TbInfoCircleFilled, TbCircleCheckFilled  } from "react-icons/tb";

interface AlertMessageProps {
    emailUsed: boolean;
    registerSuccess: boolean;
    loginFailed: boolean,
    unknownError: boolean;
    onAlertClose: () => void;
}

export default function AlertMessage({ emailUsed, registerSuccess, loginFailed, unknownError, onAlertClose }: AlertMessageProps) {

    const shouldShowAlert = emailUsed || registerSuccess || loginFailed || unknownError;
    const [isVisible, setIsVisible] = useState(shouldShowAlert);

    useEffect(() => {
        if (shouldShowAlert) {
            setIsVisible(true);
        }
    }, [shouldShowAlert]);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onAlertClose()
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onAlertClose]);

    const handleClose = () => {
        setIsVisible(false);
        onAlertClose()
    };

    if (!isVisible) {
        return null;
    }

    let alertContent = {
        title: '',
        description: '',
        icon: <TbInfoCircleFilled size={24} />,
    };

    if (emailUsed) {
        alertContent = {
            title: 'El correo ya se encuentra en uso',
            description: 'El correo está asociado a otra cuenta en la plataforma.',
            icon: <TbAlertHexagonFilled size={24} color='#d2995f'/>,
        };
    } else if (registerSuccess) {
        alertContent = {
            title: 'Registro exitoso',
            description: '¡Te has registrado correctamente!',
            icon: <TbCircleCheckFilled size={24} color='#5fd285'/>,
        };
    } else if (loginFailed) {
        alertContent = {
            title: 'Fallo al iniciar sesión',
            description: 'Ha ocurrido un error, correo o contraseña incorrectos',
            icon: <TbAlertHexagonFilled size={24} color='#d2995f'/>,
        };
    } else if (unknownError) {
        alertContent = {
            title: 'Error desconocido',
            description: 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.',
            icon: <TbAlertHexagonFilled size={24} color='#d25f5f'/>,
        };
    }

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                className={styles.alertContainer}
                key={`Alert`}
                initial={{ x: '-200%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                exit={{ x: '-200%', opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Alert
                    icon={alertContent.icon}
                    title={alertContent.title}
                    description={alertContent.description}
                    variant="faded"
                    isClosable
                    classNames={{
                        base: styles.alertBase,
                        title: styles.alertTitle,
                        description: styles.alertDescription,
                        iconWrapper: styles.iconWrapper,
                        alertIcon: styles.alertIcon,
                        closeButton: styles.alertCloseButton,
                    }}
                    onClose={handleClose}
                />
            </motion.div>
        </AnimatePresence>

    );
};
