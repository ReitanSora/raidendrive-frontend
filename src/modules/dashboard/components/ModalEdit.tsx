import styles from './ModalEdit.module.css';
import InputCustom from './InputCustom';
import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { AlertMessageInterface } from '../utils/AlertMessageInterface';

interface ModalEditProps {
    isOpen: boolean,
    onClose: () => void;
    onEdit: (id: string, data: object) => void;
    editableFields: string[];
    idKey: string;
    fieldTypes?: Record<number, string>;
    data: object;
    sendDataToParent: (data: AlertMessageInterface) => void;
}

export default function ModalEdit({ isOpen, onClose, onEdit, editableFields, idKey, fieldTypes, data, sendDataToParent }: ModalEditProps) {
    const [formData, setFormData] = useState(() => {
        const initialData: Record<string, any> = {};
        editableFields.forEach((key) => {
            const expectedType = fieldTypes[key];
            if (expectedType === 'number') {
                initialData[key] = data?.[key] ?? 0; // Usa el valor del dato o 0 como predeterminado
            } else {
                initialData[key] = data?.[key] ?? ''; // Usa el valor del dato o '' como predeterminado
            }
        });
        return initialData;
    });
    const [errors, setErrors] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        if (data) {
            const filteredData = Object.fromEntries(
                editableFields.map((key) => {
                    // console.log(typeof formData[key] === 'number' ? 'number' : 'text')
                    return [key, key in data ? data[key] : '']
                })
            )
            // console.log(filteredData);
            setFormData(filteredData);
        }
    }, [data, editableFields]);

    const handleInputChange = (key: string, value: string | number) => {
        const expectedType = fieldTypes[key] || 'string'; // Usa el tipo del esquema o 'string' por defecto

        // Convierte el valor al tipo esperado
        let convertedValue: any = value;
        if (expectedType === 'number') {
            convertedValue = value === '' ? null : Number(value); // Maneja números vacíos como `null`
        }

        // console.log(`Campo: ${key}, Valor: ${convertedValue}, Tipo: ${typeof convertedValue}`);

        setFormData((prevData) => ({
            ...prevData,
            [key]: convertedValue,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: '',
        }));
    };

    const handleSubmit = async (id: string, data: object) => {
        try {
            if (Object.values(errors).every((error) => error === '')) {
                onClose()
                await onEdit(id, data);
                sendDataToParent({ editSuccess: true })
            } else {
                sendDataToParent({ validationFailed: true })
            }
        } catch (error) {
            console.log(error)
            sendDataToParent({ unknownError: true })
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        editableFields.forEach((key) => {
            const value = formData[key];
            const expectedType = fieldTypes[key] || 'string';

            if (!value && expectedType !== 'number') {
                // Si el campo no es numérico y está vacío, marca un error
                newErrors[key] = 'Este campo no puede estar vacío';
            } else if (expectedType === 'number' && (isNaN(value) || value === null)) {
                // Si el campo es numérico y es NaN o null, marca un error
                newErrors[key] = 'Este campo debe ser un número válido';
            }
        });

        setErrors(newErrors);
        setIsSubmitDisabled(Object.values(newErrors).some(error => error !== ''));
    };

    return (
        <div className={styles.modalContainer}>
            <Modal
                backdrop={'blur'}
                isOpen={isOpen}
                onClose={onClose}
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
                            <ModalHeader>Modificar</ModalHeader>
                            <ModalBody>
                                <div className={styles.formCard}>
                                    <div className={styles.card}>
                                        {editableFields.map((key) => (
                                            <div key={key} className={styles.formInput}>
                                                <InputCustom
                                                    type={fieldTypes[key] === 'number' ? 'number' : 'text'}
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
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={onClose}>
                                    Cancelar
                                </button>
                                <button disabled={isSubmitDisabled} onClick={async () => handleSubmit(data[idKey], formData)}>
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
