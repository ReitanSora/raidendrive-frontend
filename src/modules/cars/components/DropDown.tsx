import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import styles from '../pages/CarCompare.module.css';

export default function DropDown({ text, cars, setSelectedCar }) {

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    return (
        <>
            <div className={styles.dropMenuButton} onClick={() => setIsMenuVisible(!isMenuVisible)}>
                {text}
            </div>
            <AnimatePresence initial={false}>
                {isMenuVisible ?
                    <motion.div
                        className={styles.dropMenuItems}
                        initial={{ opacity: 0, y: "-2%"}}
                        animate={{ opacity: 1, y: "0%"}}
                        transition={{ ease: "easeInOut", duration: .5, type: "spring" }}
                        exit={{ opacity: 0, y: "-2%"}}
                    >
                        {cars.map((element, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        setIsMenuVisible(!isMenuVisible);
                                        setSelectedCar(element);
                                    }}
                                    className={styles.menuItem}
                                    key={`menuItem-${index}`}>
                                    {element.brand} {element.model}
                                </div>
                            )
                        })}
                    </motion.div> : null}
            </AnimatePresence >
        </>
    );
};
