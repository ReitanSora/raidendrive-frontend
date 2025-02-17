import { Link } from 'react-router-dom';
import { IoEyeOff, IoEye } from "react-icons/io5";
import styles from './LoginPage.module.css';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import RegisterPage from './RegisterPage';
import AlertMessage from '../components/AlertMessage';
import { Tooltip } from '@heroui/tooltip';
import { IoMdInformationCircle } from 'react-icons/io';
import { validateEmail } from '../utils/validations';
import { AuthService } from '../services/authService';
import { useAuth } from '../../../context/AuthContext';

function LoginCard({ email, setEmail, password, setPassword, handleSubmit }) {

    const [isPswVisible, setIsPswVisible] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleValidation = () => {
        const newErrors = {
            email: validateEmail(email) ? '' : 'Correo electrónico inválido',
            password: password !== '' ? '' : 'La contraseña no puede estar vacía'
        };

        setErrors(newErrors);

        if (Object.values(newErrors).every(error => error === '')) {
            setIsSubmitDisabled(false)
        }
        else {
            setIsSubmitDisabled(true);
        }
    };

    return (
        <>
            <div className={styles.formText}>
                <span>Iniciar sesión</span>
                <span>Es un gusto tenerte de vuelta</span>
            </div>
            <div className={styles.formInput}>
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
                            content={errors.email}
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
                            content={errors.password}
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
                        <span>Ingresar</span>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default function LoginPage(params) {

    const [selectedTab, setSelectedTab] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const [registerData, setRegisterData] = useState({
        emailUsed: false,
        registerSuccess: false,
        loginFailed: false,
        unknownError: false,
    });

    const handleDataFromChild = (data) => {
        setRegisterData(data);
        if (data.registerSuccess) {
            setSelectedTab('Login')
        }
    };

    const resetRegisterData = () => {
        setRegisterData({
            emailUsed: false,
            registerSuccess: false,
            loginFailed: false,
            unknownError: false,
        });
    };

    function handleSelectedTab(option: string) {
        setEmail('');
        setPassword('');
        setSelectedTab(option);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const token = await AuthService.login({ email: email, password: password });
            login(token);
        } catch (error) {
            if (error instanceof Error) {
                setIsLoading(false);
                setRegisterData({
                    emailUsed: false,
                    registerSuccess: false,
                    loginFailed: true,
                    unknownError: false,
                });
            }
        };
    };

    return (
        <div className={styles.container}>
            {/* <img src='/public/a3.jpg' className={styles.fadeImage}></img> */}
            <AlertMessage
                emailUsed={registerData.emailUsed}
                registerSuccess={registerData.registerSuccess}
                loginFailed={registerData.loginFailed}
                unknownError={registerData.unknownError}
                onAlertClose={resetRegisterData}
            />
            <div className={styles.formCard}>
                <div className={styles.navigation}>
                    <motion.div
                        className={styles.navigationOption}
                        onClick={() => handleSelectedTab('Login')}
                        // style={selectedTab === 'Login' ? { backgroundColor: '#fff' } : { backgroundColor: 'transparent' }}
                        animate={{
                            background: selectedTab === 'Login' ? '#363636' : '#252525',
                            color: selectedTab === 'Login' ? '#E0E0E0' : '#8B8B8B',
                        }}
                    >
                        <span>Login</span>
                    </motion.div>
                    <motion.div
                        className={styles.navigationOption}
                        onClick={() => handleSelectedTab('Register')}
                        animate={{
                            background: selectedTab === 'Register' ? '#363636' : '#252525',
                            color: selectedTab === 'Register' ? '#E0E0E0' : '#8B8B8B',
                        }}
                    // style={selectedTab === 'Register' ? { backgroundColor: '#fff' } : { backgroundColor: 'transparent' }}
                    >
                        <span>Registro</span>
                    </motion.div>
                </div>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={`${selectedTab}-Tab`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.card}
                    >
                        {selectedTab === 'Login' ?
                            <LoginCard email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleSubmit}></LoginCard> :
                            <RegisterPage sendDataToParent={handleDataFromChild}></RegisterPage>
                        }
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
