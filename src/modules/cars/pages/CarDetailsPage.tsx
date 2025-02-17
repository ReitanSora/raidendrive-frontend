import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './CarDetails.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "motion/react";
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Zoom, Mousewheel } from 'swiper/modules';
import Header from "../../../core/components/Header";
import useTitle from "../../../hooks/useTitle";

export default function CarDetailsPage() {
    const [carData, setCarData] = useState();
    const [color, setColor] = useState();
    const params = useParams()

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:3000/cars/${params.carId}`)
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

    return (
        <div>
            <Header isVisible={false} />
            <div className={styles.contentContainer}>
                <div className={styles.galleryContainer}>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        loop={true}
                        pagination={{
                            clickable: true
                        }}
                        navigation={true}
                        rewind={true}
                        mousewheel={true}
                        modules={[Pagination, Navigation, Zoom, Mousewheel]}
                        className="mySwiper"
                        zoom={true}>
                        {carData?.details.image_url[1][0][color].map((element, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="swiper-zoom-container">
                                        <img src={element} className={styles.galleryImage}></img>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className={styles.infoContainer}>
                    <span>Configura tu nuevo {carData?.brand} {carData?.model}</span>
                    <span>Elige entre los siguientes colores</span>
                    <div className={styles.colorSelector}>
                        {carData?.details.image_url[0].map((element) => {
                            // console.log(carData?.details.image_url[0]);
                            return (
                                <motion.div whileTap={{ scale: .9 }} whileHover={{ scale: 1.2 }} className={styles.colorOption} style={{ backgroundColor: element }} onClick={() => setColor(element)} key={`colorButton-${element}`}><span></span></motion.div>
                            )
                        })}
                    </div>
                    <div className={styles.buttonContainer}>

                    </div>
                </div>
            </div>
        </div>
    );
};
