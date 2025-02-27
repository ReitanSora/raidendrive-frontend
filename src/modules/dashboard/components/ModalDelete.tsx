import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/react";
import styles from './ModalDelete.module.css';
import { AlertMessageInterface } from "../utils/AlertMessageInterface";

interface ModalDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: (id: string) => void;
    id: string;
    sendDataToParent: (data: AlertMessageInterface) => void;
}

export default function ModalDelete({ isOpen, onClose, onDelete, id, sendDataToParent }: ModalDeleteProps) {

    const handleSubmit = async (id: string) => {
        try {
            onClose();
            await onDelete(id);
            sendDataToParent({deleteSuccess: true})
        } catch {
            sendDataToParent({ unknownError: true })
        }
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
                            <ModalHeader>Confirmar eliminación</ModalHeader>
                            <ModalBody>
                                <span>Está seguro que desea eliminar el registro</span>
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={onClose}>
                                    Cancelar
                                </button>
                                <button onClick={async () => handleSubmit(id)}>
                                    Eliminar
                                </button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );

};
