import { useOutletContext } from "react-router-dom";
import DrawerComponent from "../components/DrawerComponent";
import HeaderDashboard from "../components/HeaderDashboard";
import { useAuth } from "../../../context/AuthContext";
import { Tooltip, useDisclosure } from "@heroui/react";
import styles from './UserPage.module.css';
import stylesTooltip from '../components/TooltipComponent.module.css';
import { useCallback, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ModalDelete from "../components/ModalDelete";
import ModalEdit from "../components/ModalEdit";
import TableComponent from "../components/TableComponent";
import useTitle from "../../../hooks/useTitle";
import ModalCreate from "../components/ModalCreate";
import { CarService } from "../services/carService";
import AlertMessage from "../components/AlertMessage";

const columns = [
    {
        key: "id",
        label: "Id",
    },
    {
        key: "brand",
        label: "Marca",
    },
    {
        key: "model",
        label: "Modelo",
    },
    {
        key: "year",
        label: "Año",
    },
    {
        key: "bodywork",
        label: "Carrocería",
    },
    {
        key: "door_number",
        label: "Número de puertas",
    },
    {
        key: "engine_name",
        label: "Nombre del motor",
    },
    {
        key: "engine_type",
        label: "Tipo de motor",
    },
    {
        key: "engine_position",
        label: "Posición del motor",
    },
    {
        key: "engine_size_cc",
        label: "Cilindrada (cc)",
    },
    {
        key: "feeding",
        label: "Alimentación",
    },
    {
        key: "max_power_hp",
        label: "Potencia máxima (hp)",
    },
    {
        key: "max_power_revolutions_rpm",
        label: "Revoluciones potencia máxima (rpm)",
    },
    {
        key: "max_torque_nm",
        label: "Torque máximo (Nm)",
    },
    {
        key: "max_torque_revolutions_rpm",
        label: "Revoluciones torque máximo (rpm)",
    },
    {
        key: "traction",
        label: "Tracción",
    },
    {
        key: "gearbox_type",
        label: "Tipo de caja de cambios",
    },
    {
        key: "number_of_gears",
        label: "Número de marchas",
    },
    {
        key: "top_speed_kmh",
        label: "Velocidad máxima (km/h)",
    },
    {
        key: "acceleration_0_100_s",
        label: "Aceleración 0-100 (s)",
    },
    {
        key: "front_brake_type",
        label: "Tipo de freno delantero",
    },
    {
        key: "rear_brake_type",
        label: "Tipo de freno trasero",
    },
    {
        key: "front_suspension_type",
        label: "Tipo de suspensión delantera",
    },
    {
        key: "rear_suspension_type",
        label: "Tipo de suspensión trasera",
    },
    {
        key: "tires_type",
        label: "Tipo de neumáticos",
    },
    {
        key: "front_tires_type",
        label: "Neumáticos delanteros",
    },
    {
        key: "rear_tires_type",
        label: "Neumáticos traseros",
    },
    {
        key: "color",
        label: "Color",
    },
    {
        key: "weight_k",
        label: "Peso (kg)",
    },
    {
        key: "price",
        label: "Precio",
    },
    {
        key: "mileage_km",
        label: "Kilometraje (km)",
    },
    {
        key: "description",
        label: "Descripción",
    },
    {
        key: "image_url",
        label: "URL de la imagen",
    },
    {
        key: "status",
        label: "Estado",
    },
    {
        key: "location",
        label: "Ubicación",
    },
    {
        key: "fuel_type",
        label: "Tipo de combustible",
    },
    {
        key: "actions",
        label: "Acciones",
    }
];

const Car = {
    brand: '',
    model: '',
    year: 0,
    bodywork: '',
    door_number: 0,
    engine_name: '',
    engine_type: '',
    engine_position: '',
    engine_size_cc: 0,
    feeding: '',
    max_power_hp: 0,
    max_power_revolutions_rpm: 0,
    max_torque_nm: 0,
    max_torque_revolutions_rpm: 0,
    traction: '',
    gearbox_type: '',
    number_of_gears: 0,
    top_speed_kmh: 0,
    acceleration_0_100_s: 0,
    front_brake_type: '',
    rear_brake_type: '',
    front_suspension_type: '',
    rear_suspension_type: '',
    tires_type: '',
    front_tires_type: '',
    rear_tires_type: '',
    color: '',
    weight_k: 0,
    price: 0,
    mileage_km: 0,
    description: '',
    image_url: [],
    status: '',
    location: '',
    fuel_type: '',
}

const fieldTypes: Record<keyof typeof Car, 'number' | 'string' | []> = {
    brand: 'string',
    model: 'string',
    year: 'number',
    bodywork: 'string',
    door_number: 'number',
    engine_name: 'string',
    engine_type: 'string',
    engine_position: 'string',
    engine_size_cc: 'number',
    feeding: 'string',
    max_power_hp: 'number',
    max_power_revolutions_rpm: 'number',
    max_torque_nm: 'number',
    max_torque_revolutions_rpm: 'number',
    traction: 'string',
    gearbox_type: 'string',
    number_of_gears: 'number',
    top_speed_kmh: 'number',
    acceleration_0_100_s: 'number',
    front_brake_type: 'string',
    rear_brake_type: 'string',
    front_suspension_type: 'string',
    rear_suspension_type: 'string',
    tires_type: 'string',
    front_tires_type: 'string',
    rear_tires_type: 'string',
    color: 'string',
    weight_k: 'number',
    price: 'number',
    mileage_km: 'number',
    description: 'string',
    image_url: [],
    status: 'string',
    location: 'string',
    fuel_type: 'string',
};

const normalizeCarData = (car: any) => {
    const { details, ...rest } = car;
    const normalizedData = {
        ...rest,
        ...details,
    };

    Object.keys(fieldTypes).forEach((key) => {
        const expectedType = fieldTypes[key];
        if (expectedType === 'number') {
            normalizedData[key] = Number(normalizedData[key]) || 0; // Convierte a número o asigna 0 si es inválido
        } else if (expectedType === 'string') {
            normalizedData[key] = String(normalizedData[key] || ''); // Convierte a cadena o asigna '' si es inválido
        }
    });

    return normalizedData;
};

export default function CarsPage(params) {
    useTitle('RaidenDrive - Autos')
    const editableFields = ['price', 'description']
    const context = useOutletContext();
    const [cars, setCars] = useState([]);
    const [normalizedCars, setNormalizedCars] = useState([]);
    const { token, logout } = useAuth();
    const [selectedCar, setSelectedCar] = useState(null);
    const [selectedCarEdit, setSelectedCarEdit] = useState(null);
    const [managementData, setManagementData] = useState({
        validationFailed: false,
        createSuccess: false,
        editSuccess: false,
        deleteSuccess: false,
        unkownError: false,
    })
    const {
        isOpen: isModalCreateOpen,
        onOpen: onModalCreateOpen,
        onClose: onModalCreateClose,
    } = useDisclosure();
    const {
        isOpen: isModalEditOpen,
        onOpen: onModalEditOpen,
        onClose: onModalEditClose,
    } = useDisclosure();
    const {
        isOpen: isModalDeleteOpen,
        onOpen: onModalDeleteOpen,
        onClose: onModalDeleteClose,
    } = useDisclosure();
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onOpenChange: onDrawerOpenChange,
    } = useDisclosure();

    const handleOpenModalConfirm = (car) => {
        setSelectedCar(car);
        onModalDeleteOpen();
    };
    const handleOpenModalEdit = (car) => {
        setSelectedCarEdit(car);
        onModalEditOpen();
    }

    const handleCreate = async (newCarData, region, country) => {
        try {
            const response = await CarService.create(newCarData, region, country, token);
            setCars((prevCars) => [...prevCars, response]);
            setNormalizedCars((prevNormalizedCars) => [...prevNormalizedCars, response]);
            console.log('Nuevo auto:', newCarData);
        } catch (error) {
            console.error('Error al crear el auto:', error);
            setManagementData({
                unkownError: true,
            })
        }
    };

    const handleEdit = async (carId: string, data) => {
        try {
            // console.log('Data editada',data)
            await CarService.edit(carId, data, token);
            setCars((prevCars) =>
                prevCars.map((car) =>
                    car.id === carId ? { ...car, ...data } : car
                )
            );
            setNormalizedCars((prevNormalizedCars) =>
                prevNormalizedCars.map((car) =>
                    car.id === carId ? { ...car, ...data } : car
                )
            );

            setSelectedCar(null);
            console.log(`Auto con ID ${carId} editado correctamente`);
        } catch (error) {
            console.error("Error al modificar el auto:", error);
        }
    };

    const handleDelete = async (carId) => {
        try {
            const response = await CarService.delete(carId, token);

            setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
            setNormalizedCars((prevNormalizedCars) =>
                prevNormalizedCars.filter((car) => car.id !== carId)
            );
            setSelectedCar(null);
            console.log(`Auto con ID ${carId} eliminado correctamente`);
        } catch (error) {
            console.error("Error al eliminar el auto:", error);
        }
    };

    const handleDataFromChild = (data) => {
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

    const renderCell = useCallback((car, columnKey) => {
        const cellValue = car[columnKey];

        switch (columnKey) {
            case "brand":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "model":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "year":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "bodywork":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "door_number":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "engine_name":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "engine_type":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "engine_position":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "engine_size_cc":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "feeding":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "max_power_hp":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "max_power_revolutions_rpm":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "max_torque_nm":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "max_torque_revolutions_rpm":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "traction":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "gearbox_type":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "number_of_gears":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "top_speed_kmh":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "acceleration_0_100_s":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "front_brake_type":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "rear_brake_type":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "front_suspension_type":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "rear_suspension_type":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "tires_type":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "front_tires_type":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "rear_tires_type":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "color":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "weight_k":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "price":
                return (
                    <div>
                        ${cellValue}
                    </div>
                );
            case "mileage_km":
                return (
                    <div>
                        {car.mileage}
                    </div>
                );
            case "description":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "image_url":
                const colorImages = car.image_url[1][0];
                const firstColor = Object.keys(colorImages)[0];
                const imageUrl = colorImages[firstColor][0];
                return <img src={imageUrl} alt="Car" style={{ width: '100px' }} />;
            case "status":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "location":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "fuel_type":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "created_at":
                return (
                    <div>
                        {new Date(car.created_at).toLocaleString()}
                    </div>
                );
            // case "user_role":
            //     return (
            //         <Chip
            //             classNames={{
            //                 base: [cellValue === 'admin' ? styles.chipBaseAdmin : styles.chipBaseClient],
            //                 content: styles.chipContent,
            //             }}
            //             startContent={cellValue === 'admin' ? <RiAdminLine /> : <RiUserLine />}
            //             size="sm"
            //             variant="flat">
            //             {cellValue}
            //         </Chip>
            //     );
            case "actions":
                return (
                    <div className={styles.columnActions}>
                        <Tooltip
                            content='Modificar'
                            placement="top-end"
                            classNames={{
                                content: stylesTooltip.tooltipContent
                            }}>
                            <div onClick={() => handleOpenModalEdit(car)}>
                                <AiOutlineEdit color="#B3926B" />
                            </div>
                        </Tooltip>
                        <Tooltip
                            content='Eliminar'
                            placement="top-start"
                            classNames={{
                                content: stylesTooltip.tooltipContent
                            }}>
                            <div onClick={() => handleOpenModalConfirm(car)}>
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
        const findCars = async () => {
            try {
                const response = await CarService.findAll(token);
                console.log(response)
                setCars(response);
                setNormalizedCars(response.map(normalizeCarData))
                console.log('Formato normalizado', response.map(normalizeCarData))
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error)
                }
            }
        };

        findCars();
    }, []);

    return (
        <div className={styles.mainContainer}>
            <HeaderDashboard context={context} onOpen={onDrawerOpen} logout={logout} ></HeaderDashboard>
            <DrawerComponent isOpen={isDrawerOpen} onOpenChange={onDrawerOpenChange}></DrawerComponent>
            <div className={styles.contentContainer}>
                <AlertMessage
                    validationFailed={managementData.validationFailed}
                    createSuccess={managementData.createSuccess}
                    editSuccess={managementData.editSuccess}
                    deleteSuccess={managementData.deleteSuccess}
                    unkownError={managementData.unkownError}
                    onAlertClose={resetManagementData} />
                <span className={styles.title}>Administración de Autos</span>
                <TableComponent
                    columns={columns}
                    renderCell={renderCell}
                    idKey={'id'}
                    searchColumnTerm={'model'}
                    data={normalizedCars}
                    isPossibleCreate={true}
                    onOpen={onModalCreateOpen}
                    isOpen={isModalCreateOpen}
                    onClose={onModalCreateClose}
                    onCreate={() => console.log('creando...')}
                />
            </div>
            <ModalDelete
                isOpen={isModalDeleteOpen}
                onClose={onModalDeleteClose}
                id={selectedCar?.id || ''}
                onDelete={handleDelete}
            />
            <ModalEdit
                isOpen={isModalEditOpen}
                onClose={onModalEditClose}
                data={selectedCarEdit}
                fieldTypes={fieldTypes}
                editableFields={editableFields}
                idKey={'id'}
                onEdit={handleEdit}
            />
            <ModalCreate
                isOpen={isModalCreateOpen}
                onClose={onModalCreateClose}
                dataStructure={Car}
                onCreate={handleCreate}
                sendDataToParent={handleDataFromChild}
            />
        </div>
    );
};
