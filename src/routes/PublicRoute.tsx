import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import stylesSpinner from '../core/components/Spinner.module.css';
import { Spinner } from "@heroui/react";

export default function PublicRoute({ children }) {
    const {user, isAdmin, isLoading} = useAuth()

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

    if (user) {
        if (isAdmin) {
            // console.log('Usuario admin autenticado, redirigiendo a /admin/dashboard');
            return <Navigate to="/admin/dashboard" replace />;
        } else {
            // console.log('Usuario cliente autenticado, redirigiendo a /');
            return <Navigate to="/" replace />;
        }
    }

    return children;
};
