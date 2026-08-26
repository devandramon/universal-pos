import { useState } from "react";

import type {
    FormEvent,
} from "react";

import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const navigate = useNavigate();

    const {
        login,
        isAuthenticated,
    } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(email, password);

            navigate("/dashboard");
        } catch (error: any) {
            if (error.response?.status === 422) {
                setError("Email atau password salah.");
            } else {
                setError("Terjadi kesalahan pada server.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Universal POS</h1>

            <h2>Login</h2>

            {error && (
                <p>
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="Email"
                        required
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>
        </div>
    );
}