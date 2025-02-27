import { useOutletContext } from "react-router-dom";
import DrawerComponent from "../components/DrawerComponent";
import HeaderDashboard from "../components/HeaderDashboard";
import { useAuth } from "../../../context/AuthContext";
import { Chip, Tooltip, useDisclosure } from "@heroui/react";
import styles from './UserPage.module.css';
import stylesTooltip from '../components/TooltipComponent.module.css';
import { useCallback, useEffect, useState } from "react";
import { UserService } from "../services/userService";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { RiAdminLine, RiUserLine } from "react-icons/ri";
import ModalDelete from "../components/ModalDelete";
import ModalEdit from "../components/ModalEdit";
import TableComponent from "../components/TableComponent";
import useTitle from "../../../hooks/useTitle";
import AlertMessage from "../components/AlertMessage";

const columns = [
    {
        key: "user_id",
        label: "Id",
    },
    {
        key: "user_nickname",
        label: "Nickname",
    },
    {
        key: "user_email",
        label: "Correo",
    },
    {
        key: "created_at",
        label: "Fecha de creación",
    },
    {
        key: "user_role",
        label: "Rol",
    },
    {
        key: "actions",
        label: "Acciones",
    },
];

const inferFieldTypes = (data: Record<string, never>) => {
    const types: Record<string, 'number' | 'string'> = {};
    for (const key in data) {
        if (typeof data[key] === 'number') {
            types[key] = 'number';
        } else {
            types[key] = 'string';
        }
    }
    return types;
};

export default function UsersPage() {
    useTitle('RaidenDrive - Usuarios')
    const context = useOutletContext();
    const [fieldTypes, setFieldTypes] = useState<Record<string, 'number' | 'string'>>({});
    const [users, setUsers] = useState([]);
    const { token, logout } = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserEdit, setSelectedUserEdit] = useState(null);
    const [managementData, setManagementData] = useState({
        validationFailed: false,
        createSuccess: false,
        editSuccess: false,
        deleteSuccess: false,
        unkownError: false,
    })
    const {
        isOpen: isModaDeletelOpen,
        onOpen: onModalDeleteOpen,
        onClose: onModalDeleteClose,
    } = useDisclosure();
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onOpenChange: onDrawerOpenChange,
    } = useDisclosure();
    const {
        isOpen: isModalEditOpen,
        onOpen: onModalEditOpen,
        onClose: onModalEditClose,
    } = useDisclosure();

    const handleDataFromChild = (data: object) => {
        setManagementData(data);
    };

    const resetManagementData = () => {
        setManagementData({
            validationFailed: false,
            createSuccess: false,
            editSuccess: false,
            deleteSuccess: false,
            unkownError: false,
        });
    };

    const handleOpenModalConfirm = (user) => {
        setSelectedUser(user);
        onModalDeleteOpen();
    };

    const handleOpenModalEdit = (user) => {
        setSelectedUserEdit(user);
        onModalEditOpen();
    }

    const editableFields = ['user_role'];
    const handleEdit = async (userId: string, data: any) => {
        try {
            await UserService.edit(userId, data.user_role, token);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.user_id === userId ? { ...user, ...data } : user
                )
            );

            setSelectedUser(null);
            // console.log(`Usuario con ID ${userId} editado correctamente`);
        } catch (error) {
            console.error("Error al modificar el usuario:", error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await UserService.delete(userId, token);

            setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
            setSelectedUser(null);
            // console.log(`Usuario con ID ${userId} eliminado correctamente`);
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    };

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "user_nickname":
                return (
                    <div className={styles.columnText}>
                        {cellValue}
                    </div>
                );
            case "user_email":
                return (
                    <div className={styles.columnText}>
                        {cellValue}
                    </div>
                );
            case "created_at":
                return (
                    <div className={styles.columnText}>
                        {new Date(user.created_at).toLocaleString()}
                    </div>
                );
            case "user_role":
                return (
                    <Chip
                        classNames={{
                            base: [cellValue === 'admin' ? styles.chipBaseAdmin : styles.chipBaseClient],
                            content: styles.chipContent,
                        }}
                        startContent={cellValue === 'admin' ? <RiAdminLine /> : <RiUserLine />}
                        size="sm"
                        variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className={styles.columnActions}>
                        <Tooltip
                            content='Modificar'
                            placement="top-end"
                            classNames={{
                                content: stylesTooltip.tooltipContent
                            }}>
                            <div onClick={() => handleOpenModalEdit(user)}>
                                <AiOutlineEdit color="#B3926B" />
                            </div>
                        </Tooltip>
                        <Tooltip
                            content='Eliminar'
                            placement="top-start"
                            classNames={{
                                content: stylesTooltip.tooltipContent
                            }}>
                            <div onClick={() => handleOpenModalConfirm(user)}>
                                <AiOutlineDelete color="#d25f5f" />
                            </div>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    useEffect(() => {
        const findUsers = async () => {
            try {
                const response = await UserService.findAll(token);
                setUsers(response);

                if (response.length > 0) {
                    setFieldTypes(inferFieldTypes(response[0]));
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error)
                }
            }
        };

        findUsers();
    }, []);

    return (
        <div className={styles.mainContainer}>
            <HeaderDashboard context={context} onOpen={onDrawerOpen} logout={logout}></HeaderDashboard>
            <DrawerComponent isOpen={isDrawerOpen} onOpenChange={onDrawerOpenChange}></DrawerComponent>
            <div className={styles.contentContainer}>
                <AlertMessage
                    validationFailed={managementData.validationFailed}
                    createSuccess={managementData.createSuccess}
                    editSuccess={managementData.editSuccess}
                    deleteSuccess={managementData.deleteSuccess}
                    unkownError={managementData.unkownError}
                    onAlertClose={resetManagementData} />
                <span className={styles.title}>Administración de Usuarios</span>
                <TableComponent
                    columns={columns}
                    renderCell={renderCell}
                    idKey={'user_id'}
                    searchColumnTerm={'user_email'}
                    data={users}
                    isPossibleCreate={false}
                />
            </div>
            <ModalDelete
                isOpen={isModaDeletelOpen}
                onClose={onModalDeleteClose}
                id={selectedUser?.user_id || ''}
                onDelete={handleDelete}
                sendDataToParent={handleDataFromChild}
            />
            <ModalEdit
                isOpen={isModalEditOpen}
                onClose={onModalEditClose}
                data={selectedUserEdit}
                editableFields={editableFields}
                idKey={'user_id'}
                onEdit={handleEdit}
                fieldTypes={fieldTypes}
                sendDataToParent={handleDataFromChild}
            />
        </div>
    );
};
