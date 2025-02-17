import styles from './ModalCreate.module.css';
import InputCustom from './InputCustom';
import { useEffect, useState } from 'react';
import { Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, RadioGroup, Radio } from '@heroui/react';



export default function ModalCreate({ isOpen, onClose, onCreate, dataStructure, sendDataToParent }) {
    const [formData, setFormData] = useState({});
    const [imageUrls, setImageUrls] = useState<{ color: string; urls: string[] }[]>([]);
    const [selectedRegion, setSelectedRegion] = useState('asia')
    const [selectedCountry, setSelectedCountry] = useState('japan')
    const [errors, setErrors] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    // const targetRef = useRef(null);
    // const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

    const region = {
        asia: 'Asia',
        europe: 'Europa',
    }

    const country = {
        asia: {
            japan: 'Japón',
        },
        europe: {
            italy: 'Italia',
            france: 'Francia',
            uk: 'Reino Unido',
            sweden: 'Suecia',
            germany: 'Alemania',
        }
    }

    const initializeformData = () => {
        const initialData = {};
        Object.keys(dataStructure).forEach((key) => {
            initialData[key] = typeof dataStructure[key] === 'number' ? 0 : '';
        });
        return initialData;
    };

    useEffect(() => {
        if (dataStructure) {
            setFormData(initializeformData);
        }
    }, [dataStructure]);

    const handleInputChange = (key, value) => {
        const expectedType = typeof dataStructure[key];
        let convertedValue = value;

        if (expectedType === 'number') {
            convertedValue = value === '' ? null : Number(value);
        }

        setFormData((prevData) => ({
            ...prevData,
            [key]: convertedValue,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: '',
        }));
    };

    const handleAddColor = () => {
        setImageUrls((prev) => [
            ...prev,
            { color: '', urls: [] },
        ]);
    };

    const handleAddImageUrl = (index: number, url: string) => {
        setImageUrls((prev) => {
            const updatedImageUrls = [...prev];
            updatedImageUrls[index].urls.push(url);
            return updatedImageUrls;
        });
    };

    const handleRemoveImageUrl = (colorIndex: number, urlIndex: number) => {
        setImageUrls((prev) => {
            const updatedImageUrls = [...prev];
            updatedImageUrls[colorIndex].urls.splice(urlIndex, 1);
            return updatedImageUrls;
        });
    };

    const handleRemoveColor = (colorIndex: number) => {
        setImageUrls((prev) => {
            const updatedImageUrls = [...prev];
            updatedImageUrls.splice(colorIndex, 1); // Elimina el color en el índice especificado
            return updatedImageUrls;
        });
    };

    const handleUpdateColor = (index: number, color: string) => {
        setImageUrls((prev) => {
            const updatedImageUrls = [...prev];
            updatedImageUrls[index].color = color;
            return updatedImageUrls;
        });
    };

    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);

        if (region === 'europe') {
            setSelectedCountry('italy');
        } else if (region === 'asia') {
            setSelectedCountry('japan');
        }
    };

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const handleSubmit = async () => {
        const formattedImageUrl = [
            imageUrls.map((item) => item.color),
            Array(Object.fromEntries(
                imageUrls.map((item) => [item.color, item.urls])
            )),
        ];

        const finalData = {
            ...formData,
            image_url: formattedImageUrl,
        };

        if (Object.values(errors).every((error) => error === '')) {
            sendDataToParent({
                createSuccess: true
            })
            onClose();
            await onCreate(finalData, selectedRegion, selectedCountry);
            setFormData({});
            setImageUrls([]);
            setIsSubmitDisabled(true)
            setFormData(initializeformData);
        } else {
            sendDataToParent({
                validationFailed: true
            })
        }
    };

    const validateForm = () => {
        const newErrors = {};

        Object.keys(formData).forEach((key) => {
            const value = formData[key];
            const expectedType = typeof dataStructure[key];

            if (!value && expectedType !== 'number') {
                newErrors[key] = 'Este campo no puede estar vacío';
            } else if (expectedType === 'number' && (isNaN(value) || value === null)) {
                newErrors[key] = 'Este campo debe ser un número válido';
            }

            if (key === 'image_url') {
                const hasImages = imageUrls.some((item) => item.urls.length > 0);
                const hasInvalidColors = imageUrls.some((item) => item.color && item.urls.length === 0);
                if (!hasImages) {
                    newErrors['image_url'] = 'Debes agregar al menos una imagen para un color';
                } else if (hasInvalidColors) {
                    newErrors['image_url'] = 'Cada color debe tener al menos una URL de imagen';
                } else {
                    newErrors['image_url'] = '';
                }
            }

        });

        setErrors(newErrors);

        if (Object.values(newErrors).every(error => error === '')) {
            setIsSubmitDisabled(false)
        }
        else {
            setIsSubmitDisabled(true);
        }
    };

    return (
        <div className={styles.modalContainer}>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior='inside'
                // ref={targetRef}
                classNames={{
                    wrapper: styles.modalWrapper,
                    base: styles.modalBase,
                    backdrop: styles.modalBackdrop,
                    header: styles.modalHeader,
                    body: styles.modalBody,
                    footer: styles.modalFooter,
                    closeButton: styles.modalCloseButton
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader /*{...moveProps}*/>Crear Nuevo Auto</ModalHeader>
                            <ModalBody>
                                <div className={styles.formCard}>
                                    <span className={styles.sectionTitle}>Detalles</span>
                                    <div className={styles.card}>
                                        {Object.entries(dataStructure)
                                            .filter(([key]) => key !== 'image_url')
                                            .map(([key, value]) => (
                                                <div key={key} className={styles.formInput}>
                                                    <InputCustom
                                                        type={typeof value === 'number' ? 'number' : 'text'}
                                                        label={key}
                                                        error={errors[key]}
                                                        value={formData[key]}
                                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                                        onKeyUp={validateForm}
                                                        readonly={false}
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                    <Divider orientation='horizontal' className={styles.divider}></Divider>
                                    <div className={styles.imageSection}>
                                        <span className={styles.sectionTitle}>Imágenes</span>
                                        <div className={styles.imageUploader}>
                                            {imageUrls.map((item, colorIndex) => (
                                                <div key={colorIndex} className={styles.colorSection}>
                                                    <div className={styles.colorItem}>
                                                        <div key={colorIndex} className={styles.formInput}>
                                                            <InputCustom
                                                                type={'text'}
                                                                label={'Color'}
                                                                error={errors['image_url']}
                                                                value={item.color}
                                                                onChange={(e) => handleUpdateColor(colorIndex, e.target.value)}
                                                                onKeyUp={validateForm}
                                                                readonly={false}
                                                            />
                                                        </div>
                                                        <button
                                                            className={styles.deleteColor}
                                                            onClick={() => handleRemoveColor(colorIndex)}>
                                                            Eliminar Color
                                                        </button>
                                                    </div>
                                                    {item.urls.map((url, urlIndex) => (
                                                        <div key={urlIndex} className={styles.imageItem}>
                                                            <div key={urlIndex} className={styles.formInput}>
                                                                <InputCustom
                                                                    type={'text'}
                                                                    label={'image_url'}
                                                                    error={errors['image_url']}
                                                                    value={url}
                                                                    onChange={(e) => {
                                                                        const newUrl = e.target.value;
                                                                        setImageUrls((prev) => {
                                                                            const updatedImageUrls = [...prev];
                                                                            updatedImageUrls[colorIndex].urls[urlIndex] = newUrl;
                                                                            return updatedImageUrls;
                                                                        });
                                                                    }}
                                                                    onKeyUp={validateForm}
                                                                    readonly={false}
                                                                />
                                                            </div>
                                                            <img src={url} alt={`Preview for ${item.color}`} className={styles.imagePreview} />
                                                            <button
                                                                className={styles.deleteImageUrl}
                                                                onClick={() => handleRemoveImageUrl(colorIndex, urlIndex)}>
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        className={styles.addImageUrl}
                                                        onClick={() => handleAddImageUrl(colorIndex, '')}>
                                                        Agregar URL
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                className={styles.addColor}
                                                onClick={handleAddColor}>
                                                Agregar Color
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.radioGroupContainer}>
                                        <RadioGroup
                                            label="Selecciona la región"
                                            orientation="horizontal"
                                            defaultValue={selectedRegion}
                                            onChange={handleRegionChange}
                                            classNames={{
                                                base: styles.radioGroupBase,
                                                wrapper: styles.radioGroupWrapper,
                                                label: styles.radioGroupLabel,
                                            }}>
                                            {Object.entries(region).map(([key, value]) => (
                                                <Radio
                                                key={key}
                                                value={key}
                                                classNames={{
                                                    base: styles.radioBase,
                                                    wrapper: styles.radioWrapper,
                                                    labelWrapper: styles.radioLabelWrapper,
                                                    label: styles.radioLabel,
                                                    control: styles.radioControl,
                                                }}>
                                                    {value}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                        {selectedRegion && (
                                            <RadioGroup
                                                label="Selecciona un país"
                                                orientation="horizontal"
                                                onChange={handleCountryChange}
                                                value={selectedCountry}
                                                classNames={{
                                                    base: styles.radioGroupBase,
                                                    wrapper: styles.radioGroupWrapper,
                                                    label: styles.radioGroupLabel,
                                                }}>
                                                {Object.entries(country[selectedRegion]).map(([key, value]) => (
                                                    <Radio
                                                    key={key}
                                                    value={key}
                                                    classNames={{
                                                        base: styles.radioBase,
                                                        wrapper: styles.radioWrapper,
                                                        labelWrapper: styles.radioLabelWrapper,
                                                        label: styles.radioLabel,
                                                        control: styles.radioControl,
                                                    }}>
                                                        {value}
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                        )}
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={onClose}>
                                    Cancelar
                                </button>
                                <button
                                    disabled={isSubmitDisabled}
                                    className={`${isSubmitDisabled ? styles.createButtonDisabled : styles.createButton}`}
                                    onClick={async () => {
                                        handleSubmit();
                                    }}>
                                    Aceptar
                                </button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    );
};
