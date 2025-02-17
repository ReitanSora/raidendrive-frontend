import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { Spinner } from "@heroui/react";
import stylesSpinner from '../core/components/Spinner.module.css';

export default function ProtectedRoute({ children, requiredRole }) {
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

    if (!user) {
        console.log('Usuario no autenticado, redirigiendo a /');
        return <Navigate to="/" replace />;
    }

    if (requiredRole === 'admin' && !isAdmin) {
        console.log('Acceso denegado: Se requiere rol de administrador');
        return <Navigate to={'/'} replace />;
    }

    if (requiredRole === 'client' && isAdmin) {
        console.log('Acceso denegado: Usuario admin intentando acceder a ruta de cliente');
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};