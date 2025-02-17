import {motion} from "motion/react";
import styles from "../pages/CarCompare.module.css";


export default function CardInfo({ element }) {
    return (
        <motion.div
            className={styles.carInfoContainer}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ ease: "easeInOut", duration: .5, type: "spring" }}
        >
            <div
                className={styles.imageContainer}
            >
                <img src={element.details.image_url[1][0][element.details.image_url[0][0]][0]}></img>
            </div>
            <div className={styles.technicalInfo}>
                <div className={styles.carSpec}>
                    <span>Marca</span>
                    <span>{element.brand}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Modelo</span>
                    <span>{element.model}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Año</span>
                    <span>{element.year}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Carrocería</span>
                    <span>{element.details.bodywork}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Número de puertas</span>
                    <span>{element.details.door_number}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Nombre del Motor</span>
                    <span>{element.details.engine_name}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Tipo de Motor</span>
                    <span>{element.details.engine_type}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Posición del Motor</span>
                    <span>{element.details.engine_position}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Cilindrada</span>
                    <span>{element.details.engine_size_cc}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Tipo de Combustible</span>
                    <span>{element.details.fuel_type}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Alimentación</span>
                    <span>{element.details.feeding}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Potencia Máxima</span>
                    <span>{element.details.max_power_hp}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Revoluciones Potencia Máxima</span>
                    <span>{element.details.max_power_revolutions_rpm}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Torque Máximo</span>
                    <span>{element.details.max_torque_nm}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Revoluciones Torque Máximo</span>
                    <span>{element.details.max_torque_revolutions_rpm}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Tracción</span>
                    <span>{element.details.traction}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Caja de Cambios</span>
                    <span>{element.details.gearbox_type}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Número de marchas</span>
                    <span>{element.details.number_of_gears}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Velocidad Máxima</span>
                    <span>{element.details.top_speed_kmh}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Acceleration de 0 a 100</span>
                    <span>{element.details.acceleration_0_100_s}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Tipo de Freno Frontal</span>
                    <span>{element.details.front_brake_type}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Tipo de Freno Trasero</span>
                    <span>{element.details.rear_brake_type}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Tipo de Suspensión Frontal</span>
                    <span>{element.details.front_suspension_type}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Tipo de Suspensión Trasera</span>
                    <span>{element.details.rear_suspension_type}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Tipo de Llanta</span>
                    <span>{element.details.tires_type}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Tipo de Llantas Frontales</span>
                    <span>{element.details.front_tires_type}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Tipo de Llantas Traseras</span>
                    <span>{element.details.rear_tires_type}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Color</span>
                    <span>{element.details.color}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Peso</span>
                    <span>{element.details.weight_k}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Precio</span>
                    <span>{element.details.price}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Kilometraje</span>
                    <span>{element.details.mileage}</span>
                </div>
                <div className={styles.carSpec}>
                    <span>Estado</span>
                    <span>{element.details.status}</span>
                </div>
            </div>
        </motion.div>
    );
};
