import { Alert } from '@heroui/react';
import styles from './AlertMessage.module.css';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TbAlertHexagonFilled, TbInfoCircleFilled, TbCircleCheckFilled } from "react-icons/tb";

interface AlertMessageProps {
    validationFailed?: boolean;
    createSuccess?: boolean;
    editSuccess?: boolean;
    deleteSuccess?: boolean;
    unkownError?: boolean;
    onAlertClose: () => void;
}

export default function AlertMessage({ validationFailed = false, createSuccess = false, editSuccess = false, deleteSuccess = false, unkownError = false, onAlertClose }: AlertMessageProps) {

    const shouldShowAlert = validationFailed || createSuccess || editSuccess || deleteSuccess || unkownError;
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

    if (validationFailed) {
        alertContent = {
            title: 'Fallo en las validaciones',
            description: 'Hay campos que no cumplen con las validaciones',
            icon: <TbAlertHexagonFilled size={24} color='#d2995f' />,
        };
    } else if (createSuccess) {
        alertContent = {
            title: 'Creación exitosa',
            description: '¡Has agregado un nuevo registro!',
            icon: <TbCircleCheckFilled size={24} color='#5fd285' />,
        };
    } else if (editSuccess) {
        alertContent = {
            title: 'Modificación exitosa',
            description: 'El registro ha sido modificado exitosamente',
            icon: <TbCircleCheckFilled size={24} color='#d2995f' />,
        };
    } else if (deleteSuccess) {
        alertContent = {
            title: 'Eliminación exitosa',
            description: 'El registro ha sido eliminado exitosamente',
            icon: <TbCircleCheckFilled size={24} color='#d25f5f' />,
        };
    }
    else if (unkownError) {
        alertContent = {
            title: 'Error desconocido',
            description: 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.',
            icon: <TbAlertHexagonFilled size={24} color='#d25f5f' />,
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
