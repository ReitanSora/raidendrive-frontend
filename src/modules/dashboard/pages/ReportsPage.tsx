import { useOutletContext } from "react-router-dom";
import HeaderDashboard from "../components/HeaderDashboard";
import { Spinner, useDisclosure } from "@heroui/react";
import { useAuth } from "../../../context/AuthContext";
import styles from './ReportsPage.module.css';
import DrawerComponent from "../components/DrawerComponent";
import useTitle from "../../../hooks/useTitle";
import InputCustom from "../components/InputCustom";
import { useState } from "react";
import { MdOutlineFileDownload, MdOutlineFileDownloadOff } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LogService } from "../services/logService";
import { handleExportExcel } from "../utils/ExportExcel";

export default function ReportsPage() {
    useTitle('RaidenDrive - Reportes');
    const context = useOutletContext();
    const { token, logout } = useAuth();
    const [errors, setErrors] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [searchUser, setSearchUser] = useState('');
    const [logs, setLogs] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onOpenChange: onDrawerOpenChange,
    } = useDisclosure();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!searchUser && searchUser === '') {
            newErrors['userId'] = 'Este campo no puede estar vacío';
        }

        setErrors(newErrors);
        setIsSubmitDisabled(Object.values(newErrors).some(error => error !== ''));
    };

    const handleSubmit = async () => {
        if (!isSubmitDisabled) {
            setIsLoading(true);
            try {
                const response = await LogService.findById(token, searchUser);
                setLogs(response);
            } catch (error) {
                console.log(error)
                setLogs(null);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div className={styles.mainContainer}>
            <HeaderDashboard context={context} onOpen={onDrawerOpen} logout={logout}></HeaderDashboard>
            <DrawerComponent isOpen={isDrawerOpen} onOpenChange={onDrawerOpenChange}></DrawerComponent>
            <div className={styles.contentContainer}>
                <span className={styles.title}>Reportes</span>
                <div className={styles.form}>
                    <div className={styles.formInput}>
                        <InputCustom
                            label={'UserID'}
                            error={errors['userId']}
                            type={'text'}
                            onKeyUp={validateForm}
                            readonly={false}
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)}
                        />
                        <div
                            onClick={handleSubmit}
                            className={`${styles.searchButton} ${isSubmitDisabled ? styles.searchButtonDisabled : ''}`}>
                            <IoSearch />
                            <span>Buscar</span>
                        </div>
                    </div>
                    <div className={styles.file}>
                        {!isLoading ?
                            (logs ?
                                <>
                                    <MdOutlineFileDownload />
                                    <span>Reporte listo para descargar</span>
                                    <div className={styles.downloadButton} onClick={() => handleExportExcel(logs, searchUser)}>
                                        <span>Descargar</span>
                                    </div>
                                </>
                                :
                                <>
                                    <MdOutlineFileDownloadOff />
                                    <span>No se ha encontrado registros</span>
                                </>
                            )
                            :
                            <div className={styles.container}>
                                <Spinner
                                    classNames={{
                                        base: [styles.spinnerBase, styles.spinnerBaseBig],
                                        circle1: styles.spinnerCircle1,
                                        circle2: styles.spinnerCircle2
                                    }} />
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};
