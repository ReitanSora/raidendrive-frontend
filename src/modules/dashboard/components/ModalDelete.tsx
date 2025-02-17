import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/react";
import styles from './ModalDelete.module.css';

export default function ModalDelete({ isOpen, onClose, onDelete, id }) {

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
                                {/* <div className={styles.modalUserInfo}>
                                    <span>Id:</span>
                                    <span>{data.user_id}</span>
                                </div>
                                <div className={styles.modalUserInfo}>
                                    <span>Nickname:</span>
                                    <span>{data.user_nickname}</span>
                                </div>
                                <div className={styles.modalUserInfo}>
                                    <span>Correo:</span>
                                    <span>{data.user_email}</span>
                                </div>
                                <div className={styles.modalUserInfo}>
                                    <span>Rol:</span>
                                    <span>{data.user_role}</span>
                                </div> */}
                            </ModalBody>
                            <ModalFooter>
                                <button onClick={onClose}>
                                    Cancelar
                                </button>
                                <button onClick={async () => {
                                    if (id && onDelete) {
                                        await onDelete(id);
                                    }
                                    onClose();
                                }}>
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
