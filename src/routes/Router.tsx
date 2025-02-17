import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../modules/login/pages/LoginPage";
import NotFoundPage from "../core/pages/NotFoundPage";
import CarPage from "../modules/cars/pages/CarPage";
import CarDetailsPage from "../modules/cars/pages/CarDetailsPage";
import CarComparePage from "../modules/cars/pages/CarComparePage";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
import PublicRoute from "./PublicRoute";
import PublicAndClientRoute from "./PublicAndClientRoute";
import UsersPage from "../modules/dashboard/pages/UsersPage";
import DashboardPage from "../modules/dashboard/pages/DashboardPage";
import CarsPage from "../modules/dashboard/pages/CarsPage";

const router = createBrowserRouter([
    {
        path: '/',
        index: true,
        element:
            <PublicAndClientRoute>
                <CarPage />
            </PublicAndClientRoute>,
        errorElement: <NotFoundPage />
    },
    {
        path: '/login',
        element:
            <PublicRoute>
                <LoginPage />
            </PublicRoute>,
        errorElement: <NotFoundPage />
    },
    {
        path: '/car',
        element:
        <PublicAndClientRoute>
            <ClientLayout></ClientLayout>
        </PublicAndClientRoute>,
        children: [
            {
                path: ':carId',
                element: <CarDetailsPage />,
                errorElement: <NotFoundPage />
            },
            {
                path: 'compare',
                element: <CarComparePage />,
                errorElement: <NotFoundPage />
            }
        ]
    },
    {
        path: '/admin',
        element:
            <ProtectedRoute requiredRole={'admin'}>
                <AdminLayout />
            </ProtectedRoute>,
        children: [
            {
                path: 'dashboard',
                element: <DashboardPage />,
                errorElement: <NotFoundPage />
            },
            {
                path: 'users',
                element: <UsersPage />,
                errorElement: <NotFoundPage />
            },
            {
                path: 'cars',
                element: <CarsPage />,
                errorElement: <NotFoundPage />
            },
        ]
    }
]);

export default function Router() {
    return (
        <AuthProvider>
            <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
    );
};
