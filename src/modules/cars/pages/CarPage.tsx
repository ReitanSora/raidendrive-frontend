import { useEffect, useState } from "react";
import styles from './CarPage.module.css';
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import ContentElement from "../components/ContentElement";
import Header from "../../../core/components/Header";
import useTitle from "../../../hooks/useTitle";


function Modal({ onClickEvent, carData }) {

    const color = carData.details.image_url[0][0];

    return (
        <motion.div
            className={styles.modalContainer}
            initial={{ opacity: 0, y: "200%" }}
            animate={{ opacity: 1, y: "0" }}
            transition={{ ease: "easeInOut", duration: 1, type: "spring", bounce: 0.15 }}
            exit={{ opacity: 0, y: "-200%" }}>
            <motion.div className={styles.modalImageContainer}>
                <img src={carData.details.image_url[1][0][color][0]}></img>
            </motion.div>
            <motion.div className={styles.modalInfoButtonContainer}>
                <motion.div className={styles.modalInfoContainer}>
                    <span>{carData.brand} - {carData.model}</span>
                    <div className={styles.carSpec}>
                        <span>De:</span>
                        <span>{carData.year}</span>
                    </div>
                    <div className={styles.carSpec}>
                        <span>Color:</span>
                        <span>{carData.details.color}</span>
                    </div>
                    <div className={styles.carSpec}>
                        <span>Carrocería:</span>
                        <span>{carData.details.bodywork}</span>
                    </div>
                    <div className={styles.carSpec}>
                        <span>Caja de cambios:</span>
                        <span>{carData.details.gearbox_type}</span>
                    </div>
                    <div className={styles.carSpec}>
                        <span>Precio:</span>
                        <span>{carData.details.price}</span>
                    </div>
                </motion.div>
                <motion.div className={styles.modalButtonContainer}>
                    <motion.div onClick={onClickEvent} className={styles.cancelButton} whileTap={{ scale: 0.9 }}>Cancelar</motion.div>
                    <Link to={`/car/${carData.id}`} className={styles.buyButtonLink}><motion.div className={styles.buyButton} whileTap={{ scale: 1.1 }}>Configurar</motion.div></Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function CarPage() {
    useTitle('Inicio - RaidenDrive');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCar, setSelectedCar] = useState();
    const [cars, setCars] = useState([]);


    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch('http://127.0.0.1:3000/cars')
                const response = await res.json();
                setCars(response);

            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);


    return (
        <div>
            <Header isVisible={isVisible}></Header>
            <div className={`${styles.contentContainer} ${isVisible ? styles.blur : ""}`}>
                <div className={styles.contentTitle}>
                    {/* <h2>Autos Disponibles</h2> */}
                    Elije tu próximo auto
                    <div className={styles.droppingText}>
                        <div>Nissan</div>
                        <div>Toyota</div>
                        <div>Porsche</div>
                        <div>Deportivo!</div>
                    </div>
                </div>
                <div className={styles.contentElementsContainer}>
                    {cars.map((element, index) => {
                        return (
                            <ContentElement
                                key={`content-element-${index}`}
                                element={element}
                                index={index}
                                onClickEvent={() => {
                                    setIsVisible(true);
                                    setSelectedCar(element)
                                }}></ContentElement>
                        )
                    })}
                </div>
            </div>
            <AnimatePresence initial={false}>
                {isVisible ?
                    <motion.div
                        className={styles.modalBackground}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeInOut", duration: .5, type: "spring", bounce: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <Modal onClickEvent={() => setIsVisible(false)} carData={selectedCar}></Modal>
                    </motion.div>
                    : null}
            </AnimatePresence>
        </div >
    );
};
