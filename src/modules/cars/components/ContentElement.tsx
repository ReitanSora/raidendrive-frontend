import { Link } from "react-router-dom";
import AnimatedImage from "./AnimatedImage";
import styles from './ContentElement.module.css';

export default function ContentElement({ element, index}) {

    return (
        <Link to={`/car/${index}`} className={styles.elementContainer} key={`elementContainer-${index}`}>
            <div className={styles.elementTitleContainer} key={`elementTitleContainer-${index}`}>
                <div className={styles.elementTitle} key={`elementTitle-${index}`}>
                    <span key={`elementTitle-${index}`}>{element.brand}</span>
                </div>
            </div>
            <AnimatedImage element={element} index={index}></AnimatedImage>
            <div className={styles.elementInfoContainer} key={`elementInfoContainer-${index}`}>
                <span>{element.model}</span>
                <span>$ {element.details.price}</span>
            </div>
        </Link>
    );
};
