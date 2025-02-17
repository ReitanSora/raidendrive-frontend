import { motion } from "motion/react";
import styles from './AnimatedImage.module.css';
import { useState } from "react";

export default function AnimatedImage({element, index}) {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const color = element.details.image_url[0][0];
    // console.log(element.details.image_url[1][0][color])
    return (
        <div className={styles.elementImageContainer} key={`elementImageContainer-${index}`}>
            {!isImgLoaded &&
                <motion.div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, #8B8B8B 25%, #D1D5DB 50%, #8B8B8B 75%)",
                        backgroundSize: "200% 100%",
                    }}
                    animate={{
                        backgroundPosition: ["200% 0", "-200% 0"],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                </motion.div>
            }
            <motion.img
                src={element.details.image_url[1][0][color][0]}
                className={styles.elementImage}
                alt={`${element.brand} - ${element.model} img`}
                onLoad={() => setIsImgLoaded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: isImgLoaded ? 1 : 0 }}
                transition={{ ease: "easeInOut", duration: .5 }}
            ></motion.img>
        </div>
    )
};
