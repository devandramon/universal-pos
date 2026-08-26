import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();

    const handleLogout = async () => {
        await logout();

        navigate("/login");
    };

    return (
        <div>
            <h1>Universal POS</h1>

            <h2>Dashboard</h2>

            <p>
                Selamat datang, {user?.name}
            </p>

            <p>
                Email: {user?.email}
            </p>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}