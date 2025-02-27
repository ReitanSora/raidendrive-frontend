import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../modules/login/services/authService";
import { AuthLogService } from "../services/authLogService";

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: never) => {
    const [token, setToken] = useState<string | null>();
    const [user, setUser] = useState<object | null>();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (userData: {accessToken: string}) => {
        setToken(userData.accessToken);
        const response = await AuthService.secured(userData.accessToken);
        if (response) {
            setUser(response);
            setIsAdmin(response.role === 'admin');
            window.localStorage.setItem('loggedUserToken', userData.accessToken)
        }
    };

    const logout = async () => {
        await AuthLogService.logout(token);
        setToken(null);
        setUser(null);
        setIsAdmin(false);
        window.localStorage.removeItem('loggedUserToken');
    };

    useEffect(() => {
        const validateToken = async () => {
            try {
                const userToken = window.localStorage.getItem('loggedUserToken');
                if (userToken) {
                    const response = await AuthService.secured(userToken);
                    if (response) {
                        setToken(userToken)
                        setUser(response);
                        setIsAdmin(response.role === 'admin');
                    }
                }
            } catch (error) {
                if (error instanceof Error) {
                    logout();
                }
            } finally {
                setIsLoading(false);
            }
        };

        validateToken();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAdmin,
                isLoading,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    );
};

