import { Link } from "react-router-dom";
import styles from "./SearchResultList.module.css";

export default function SearchResultList({ results }) {
    return (
        <div className={styles.resultListContainer}>
            {results.map((element, index) => {
                return (
                    <Link className={styles.linkContainer} to={`/car/${element.id}`} key={`resultElement-${index}`}>
                        <div className={styles.resultElement}>
                            {element.brand} {element.model}
                        </div>
                    </Link>
                )
            })}
        </div>
    );
};
