import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout(params) {
    const { user } = useAuth()

    return (
        <div>
            <Outlet context={user}></Outlet>
        </div>
    );
};
