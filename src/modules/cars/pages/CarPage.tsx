import { useEffect, useState } from "react";
import styles from './CarPage.module.css';
import ContentElement from "../components/ContentElement";
import Header from "../../../core/components/Header";
import useTitle from "../../../hooks/useTitle";

export default function CarPage() {
    useTitle('RaidenDrive - Inicio');
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch('http://localhost/apicar/cars')
                const response = await res.json();
                setCars(response);

            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);


    return (
        <div className={styles.mainContainer}>
            <Header></Header>
            <div className={styles.contentContainer}>
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
                                index={element.id}
                            ></ContentElement>
                        )
                    })}
                </div>
            </div>
        </div >
    );
};
