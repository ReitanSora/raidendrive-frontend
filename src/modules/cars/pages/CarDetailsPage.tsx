import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './CarDetails.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "motion/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Header from "../../../core/components/Header";
import useTitle from "../../../hooks/useTitle";
import { useAuth } from "../../../context/AuthContext";
import { IoIosArrowUp } from "react-icons/io";

export default function CarDetailsPage() {
    const { user, token } = useAuth();
    const [carData, setCarData] = useState();
    const [color, setColor] = useState();
    const params = useParams()
    useTitle('RaidenDrive - Detalle');
    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const res = await fetch(`http://localhost/apicar/cars/${params.carId}`)
                const response = await res.json();
                setCarData(response);
                setColor(response.details.image_url[0][0]);
                // console.log(typeof response.details.image_url[0][0])
                // console.log(response)
            } catch (error) {
                console.log('Error while fetching car ', params.carId, ' data, error: ', error)
            }
        };
        
        fetchCarData();

    }, [params.carId]);
    useTitle(`${carData?.brand} ${carData?.model}`);

    const createOrder = async () => {
        try {
            const response = await fetch('http://localhost/apicar/payment/create-order', {
                method: 'POST',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: `${carData.details.price}`,
                    name: `${carData.brand} ${carData.model}`,
                    description: carData.details.description
                }),
            });
            const orderData = await response.json();
            console.log('Este es el orderData', orderData);
            return orderData.id; // Este ID es fundamental para las siguientes operaciones
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const onApprove = async (data) => {
        try {
            const response = await fetch('http://localhost/apicar/payment/capture-order', {
                method: 'POST',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: data.orderID
                }),
            });
            const captureData = await response.json();
            console.log('Capture result:', captureData);

            // Aquí puedes manejar la lógica post-pago (ej. actualizar base de datos)
            if (captureData.status === 'COMPLETED') {
                // Redirigir o mostrar mensaje de éxito
            }
        } catch (error) {
            console.error('Error capturing order:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.mainContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.galleryContainer}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            loop={false}
                            pagination={{
                                clickable: true
                            }}
                            navigation={true}
                            rewind={true}
                            modules={[Pagination, Navigation]}
                            className={styles.swipper}>
                            {carData?.details.image_url[1][0][color].map((element, index) => {
                                return (
                                    <SwiperSlide key={index} className={styles.imageContainer}>
                                        <img src={element} className={styles.galleryImage}></img>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.configCarTitle}>
                            <span>Configura tu nuevo </span>
                            <span>{carData?.brand} {carData?.model}</span>
                        </div>
                        <div className={styles.configCarOption}>
                            <span>Elige entre los siguientes colores</span>
                            <div className={styles.colorSelector}>
                                {carData?.details.image_url[0].map((element) => {
                                    // console.log(carData?.details.image_url[0]);
                                    return (
                                        <motion.div whileTap={{ scale: .95 }} whileHover={{ scale: 1.05 }} className={styles.colorOption} style={{ backgroundColor: element }} onClick={() => setColor(element)} key={`colorButton-${element}`}><span></span></motion.div>
                                    )
                                })}
                            </div>
                        </div>
                        <motion.div
                            whileHover={{
                                y: -50
                            }}
                            className={styles.buttonContainer}
                        >
                            <div className={styles.paymentButton}>
                                {user ?
                                    <>
                                        <PayPalScriptProvider
                                            options={{
                                                clientId: "ASpYbpWtKl8rJOOfyL9LXx2_R-0Rs-wkk2veWHYtXu5_0bR-z2h2ZO3SrvmtKo7Oi6NckfArgh6cyCfq"
                                            }}>
                                            <PayPalButtons
                                                style={{
                                                    color: "black",
                                                    label: "buynow",
                                                    layout: "horizontal",
                                                    disableMaxWidth: true,
                                                    tagline: false,
                                                    height: 55,
                                                    borderRadius: 0,
                                                }}
                                                createOrder={async () => {
                                                    try {
                                                        const response = await createOrder();
                                                        console.log('OrderId', response);
                                                        return response;
                                                    } catch (error) {
                                                        console.log('Error', error)
                                                    }
                                                }}
                                                // onCancel={() => }
                                                onApprove={onApprove}
                                                onError={(err) => console.error('PayPal error:', err)}
                                            />
                                        </PayPalScriptProvider>
                                        <div className={styles.iconContainer}>
                                            <IoIosArrowUp />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <span>Inicia Sesión para comprar</span>
                                        <div className={styles.iconContainer}>
                                            <IoIosArrowUp />
                                        </div>
                                    </>
                                }
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
