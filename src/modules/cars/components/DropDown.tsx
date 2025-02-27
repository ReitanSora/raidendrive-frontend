import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { Key, useState } from "react";
import styles from './Dropdown.module.css';
import { IoIosArrowDown } from 'react-icons/io';

export default function DropDown({ cars, setSelectedCar }) {
    const [selectedKeys, setSelectedKeys] = useState(new Set());

    const handleSelectionChange = (keys: Key) => {
        setSelectedKeys(keys);
        const selectedKey = Array.from(keys)[0];
        if (selectedKey) {
            const selectedCar = cars.find((car) => car.model === selectedKey);
            if (selectedCar) {
                setSelectedCar(selectedCar);
            }
        }
        else{
            setSelectedCar(null);
        }
    };

    const getTriggerText = () => {
        const selectedKey = Array.from(selectedKeys)[0];
        if (selectedKey) {
            return selectedKey; // Muestra el modelo seleccionado
        }
        return 'Seleccione'; // Texto predeterminado si no hay selección
    };

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <div className={styles.dropDownTrigger}>
                        <button>{getTriggerText()}</button>
                        <IoIosArrowDown />
                    </div>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Single selection example"
                    selectedKeys={selectedKeys}
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={handleSelectionChange}
                    classNames={{
                        base: styles.dropDownMenuBase,
                        list: styles.dropDownMenuList,
                        emptyContent: styles.dropDownMenuEmptyContent,
                    }}
                >
                    {cars.map((car) => (
                        <DropdownItem
                            key={car.model}
                            value={car.model}
                            textValue={car.model}
                            classNames={{
                                base: styles.dropDownItemBase,
                                wrapper: styles.dropDownItemWrapper,
                                title: styles.dropDownItemTitle,
                                selectedIcon: styles.dropDownItemSelectedIcon,
                            }}
                        >
                            {car.model}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown >
            {/* <div className={styles.dropMenuButton} onClick={() => setIsMenuVisible(!isMenuVisible)}>
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
            </AnimatePresence > */}
        </>
    );
};
