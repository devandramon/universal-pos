import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type {
    ReactNode,
} from "react";

import api from "../services/api";

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    const fetchUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.get("/user");

            setUser(response.data.user);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
        } catch {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (
        email: string,
        password: string
    ) => {
        const response = await api.post("/login", {
            email,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setUser(user);
    };

    const logout = async () => {
        try {
            await api.post("/logout");
        } catch {
            // Token mungkin sudah tidak valid.
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth harus digunakan di dalam AuthProvider"
        );
    }

    return context;
}