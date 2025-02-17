import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import stylesSpinner from '../core/components/Spinner.module.css';
import { Spinner } from "@heroui/react";

export default function PublicAndClientRoute({ children }) {
    const { user, isAdmin, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className={stylesSpinner.container}>
                <Spinner
                    classNames={{
                        base: [stylesSpinner.spinnerBase, stylesSpinner.spinnerBaseBig],
                        circle1: stylesSpinner.spinnerCircle1,
                        circle2: stylesSpinner.spinnerCircle2
                    }} />
            </div>
        );
    }

    if (isAdmin) {
        console.log('Usuario admin detectado, redirigiendo a /admin/dashboard');
        return <Navigate to="/admin/dashboard" replace />;
    }

    console.log('Acceso permitido: Usuario no autenticado o cliente');
    return children;
};
