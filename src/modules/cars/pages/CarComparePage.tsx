import { Link } from "react-router-dom";
import styles from './CarCompare.module.css';
import logo from '../../../assets/logo.svg';
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import DropDown from "../components/DropDown";
import CardInfo from "../components/CardInfo";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import Header from "../../../core/components/Header";

export default function CarComparePage(params) {

    const [selectedCar1, setSelectedCar1] = useState(null);
    const [selectedCar2, setSelectedCar2] = useState(null);
    const [cars, setCars] = useState([]);
    const [compareCarsInfo, setCompareCarsInfo] = useState(null);
    const dataChart = compareCarsInfo ? [
        { attribute: "Potencia", coche1: compareCarsInfo[0]?.details.max_power_hp || 0, coche2: compareCarsInfo[1]?.details.max_power_hp || 0 },
        { attribute: "Torque", coche1: compareCarsInfo[0]?.details.max_torque_nm || 0, coche2: compareCarsInfo[1]?.details.max_torque_nm || 0 },
        { attribute: "Velocidad", coche1: compareCarsInfo[0]?.details.top_speed_kmh || 0, coche2: compareCarsInfo[1]?.details.top_speed_kmh || 0 },
        // { attribute: "Aceleración(s)", coche1: compareCarsInfo[0]?.details.acceleration_0_100_s || 0, coche2: compareCarsInfo[1]?.details.acceleration_0_100_s || 0 },
        { attribute: "Cilindrada", coche1: compareCarsInfo[0]?.details.engine_size_cc || 0, coche2: compareCarsInfo[1]?.details.engine_size_cc || 0 },
        { attribute: "Peso", coche1: compareCarsInfo[0]?.details.weight_k || 0, coche2: compareCarsInfo[1]?.details.weight_k || 0 },
    ] : [];

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch('http://127.0.0.1:3000/cars')
                const response = await res.json();
                setCars(response);

            } catch (error) {
                console.error('Error fetching cars: ', error);
            }
        };

        fetchCars();
    }, []);

    useEffect(() => {
        const fetchComparison = async () => {
            try {
                if (selectedCar1 !== null && selectedCar2 !== null) {
                    const res = await fetch(`http://127.0.0.1:3000/cars/comparison?idCar1=${selectedCar1.id}&idCar2=${selectedCar2.id}`)
                    const response = await res.json();
                    console.log('Comparacion:', response);
                    setCompareCarsInfo(response)
                }
            } catch (error) {
                console.log('Error while fetching  car comparison: ', error)
            }
        };

        fetchComparison();
    }, [selectedCar1, selectedCar2])

    if (compareCarsInfo !== null) {
        console.log(compareCarsInfo[0]['model'] === selectedCar2.model)
    }

    // if (selectedCar2) {
    //     console.log(selectedCar2.details.image_url[1][0][selectedCar2.details.image_url[0][0]])
    // }


    return (
        <div>
            <Header isVisible={false}></Header>
            <div className={styles.contentContainer}>
                <div className={styles.contentTitle}>
                    <h2>Comparar Autos</h2>
                </div>
                <div className={styles.comparationContainer}>
                    <div className={styles.infoContainer}>
                        <div className={styles.dropMenuContainer}>
                            <DropDown text={selectedCar1 !== null ? `${selectedCar1.brand} ${selectedCar1.model} ` : 'Seleccionar'} cars={cars} setSelectedCar={setSelectedCar1} ></DropDown>
                        </div>
                        <AnimatePresence initial={false}>
                            {compareCarsInfo !== null ?
                                <CardInfo element={compareCarsInfo[0]}></CardInfo>
                                : null}
                        </AnimatePresence>
                    </div>
                    <div className={styles.radarChartContainer}>
                        {compareCarsInfo && (
                            <ResponsiveContainer width={400} height={400}>
                                <RadarChart data={dataChart}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="attribute" style={{ fontFamily: 'Montserrat', fontSize: 'small', fontWeight: 'bold', textWrap: 'wrap', textOverflow: 'ellipsis' }} />
                                    <PolarRadiusAxis style={{ fontFamily: 'Montserrat', fontSize: 'small', fontWeight: 'bold', textWrap: 'wrap', textOverflow: 'ellipsis' }} />
                                    <Radar name={compareCarsInfo[0].model} dataKey="coche1" fill="#313656" fillOpacity={0.6} />
                                    <Radar name={compareCarsInfo[1].model} dataKey="coche2" fill="#B3926B" fillOpacity={0.6} />
                                    <Tooltip wrapperStyle={{ fontFamily: 'Montserrat', fontSize: 'small', fontWeight: 'bold', textWrap: 'wrap', textOverflow: 'ellipsis' }} />
                                    <Legend align="center" layout="vertical" verticalAlign="bottom" wrapperStyle={{ fontFamily: 'Montserrat', fontWeight: 'bold' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.dropMenuContainer}>
                            <DropDown text={selectedCar2 !== null ? `${selectedCar2.brand} ${selectedCar2.model} ` : 'Seleccionar'} cars={cars} setSelectedCar={setSelectedCar2} ></DropDown>
                        </div>
                        <AnimatePresence initial={false}>
                            {compareCarsInfo !== null ?
                                <CardInfo element={compareCarsInfo[1]}></CardInfo>
                                : null}
                        </AnimatePresence>

                    </div>
                </div>
            </div>
        </div>
    );
};
