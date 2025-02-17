import { IoEyeOff, IoEye } from "react-icons/io5";
import styles from './LoginPage.module.css';
import stylesSpinner from '../../../core/components/Spinner.module.css';
import { Tooltip, Spinner } from "@heroui/react";
import { motion } from 'motion/react';
import { useEffect, useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { validateEmail, validateNickname, validatePassword } from "../utils/validations";
import { UserService } from "../services/userService";
import { Link } from "react-router-dom";

interface ChildProps {
    sendDataToParent: (data) => void;
}

export default function RegisterPage({ sendDataToParent }: ChildProps) {

    const [isPswVisible, setIsPswVisible] = useState(false);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setsuccessMsg] = useState({
        nickname: 'Nickname correcto',
        email: 'Formato correcto',
        password: 'Contraseña segura'
    });
    const [errors, setErrors] = useState({
        nickname: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    const handleValidation = () => {
        const newErrors = {
            nickname: validateNickname(nickname) ? '' : 'Nickname inválido (max 20 caracteres sin espacios vacíos)',
            email: validateEmail(email) ? '' : 'Correo electrónico inválido',
            password: validatePassword(password) ? '' : 'La contraseña debe tener 8+ caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial'
        };

        setErrors(newErrors);

        if (Object.values(newErrors).every(error => error === '')) {
            setIsSubmitDisabled(false)
        }
        else {
            setIsSubmitDisabled(true);
        }
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const response = await UserService.emailUsed(email);
            if (!response.isUsed) {
                const response = await UserService.create({ user_nickname: nickname, user_email: email, user_password: password });
                if (response) {
                    setNickname('');
                    setEmail('');
                    setPassword('');
                    sendDataToParent({
                        registerSuccess: true
                    });
                }
            } else {
                sendDataToParent({
                    emailUsed: response.isUsed
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                setIsLoading(false);
                sendDataToParent({
                    unknownError: true,
                });
            }
        };
    };

    return (
        <>
            <div className={styles.formText}>
                <span>Registro</span>
                <span>Bienvenido a RaidenDrive</span>
            </div>
            <div className={styles.formInput}>
                <div className={styles.inputContainer}>
                    <input
                        type='text'
                        required
                        placeholder=' '
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        onKeyUp={handleValidation}
                    />
                    <label>Nickname</label>
                    <div className={styles.tooltipContainer}>
                        <Tooltip
                            content={errors.nickname || successMsg.nickname}
                            color="danger"
                            showArrow={true}
                            placement="top-start"
                            classNames={{
                                content: [styles.tooltip]
                            }}>
                            <div>
                                <IoMdInformationCircle size={24} color={errors.nickname !== '' ? '#d25f5f' : '#8B8B8B'} />
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type='email'
                        required
                        placeholder=' '
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyUp={handleValidation}
                    />
                    <label>Correo</label>
                    <div className={styles.tooltipContainer}>
                        <Tooltip
                            content={errors.email || successMsg.email}
                            color="danger"
                            showArrow={true}
                            placement="top-start"
                            classNames={{
                                content: [styles.tooltip]
                            }}>
                            <div>
                                <IoMdInformationCircle size={24} color={errors.email !== '' ? '#d25f5f' : '#8B8B8B'} />
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type={isPswVisible ? 'text' : 'password'}
                        required
                        placeholder=' '
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyUp={handleValidation}
                    />
                    <label>Contraseña</label>
                    <div className={styles.revealPasswordButton} onClick={() => setIsPswVisible(!isPswVisible)}>
                        {isPswVisible ? <IoEyeOff size={25} color='#f2f2f2' /> : <IoEye size={25} />}
                    </div>
                    <div className={styles.tooltipContainer}>
                        <Tooltip
                            content={errors.password || successMsg.password}
                            color="danger"
                            showArrow={true}
                            placement="top-start"
                            classNames={{
                                content: [styles.tooltip]
                            }}>
                            <div>
                                <IoMdInformationCircle size={24} color={errors.password !== '' ? '#d25f5f' : '#8B8B8B'} />
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className={styles.formOptions}>
                <div>
                    <Link to={'/'}>¿Cancelar?</Link>
                </div>
                <div>
                    <motion.div
                        className={`${styles.submitButton} ${isSubmitDisabled ? styles.submitButtonDisabled : ''}`}
                        whileTap={isSubmitDisabled ? {} : { y: 5 }}
                        transition={{ duration: 0.05, bounce: 0 }}
                        onClick={isSubmitDisabled ? undefined : handleSubmit}
                    >
                        {isLoading ?
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: .3 }}>
                                <Spinner
                                    classNames={{
                                        base: stylesSpinner.spinnerBase,
                                        circle1: stylesSpinner.spinnerCircle1,
                                        circle2: stylesSpinner.spinnerCircle2
                                    }}
                                />
                            </motion.div>
                            : <span>Registrarme</span>}
                    </motion.div>
                </div>
            </div>
        </>
    );
};
