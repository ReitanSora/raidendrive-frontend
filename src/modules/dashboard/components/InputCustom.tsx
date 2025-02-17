import { Tooltip } from "@heroui/tooltip";
import { IoMdInformationCircle } from "react-icons/io";
import styles from './InputCustom.module.css';

export default function InputCustom({ type, label, error, value, onChange, onKeyUp, readonly }) {

    // const capitalize = (text: string) => {
    //     return text.toUpperCase();
    // }

    return (
        <div className={styles.inputContainer}>
            <input
                type={type}
                required
                placeholder=' '
                readOnly={readonly}
                value={value}
                onChange={onChange}
                onKeyUp={onKeyUp}
            />
            <label>{String(label).toUpperCase()}</label>
            <div className={styles.tooltipContainer}>
                <Tooltip
                    content={error}
                    color="danger"
                    showArrow={true}
                    placement="top-start"
                    classNames={{
                        content: [styles.tooltip]
                    }}>
                    <div>
                        <IoMdInformationCircle size={24} color={'#8B8B8B'} />
                    </div>
                </Tooltip>
            </div>
        </div>
    );
};
