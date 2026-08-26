import api from "./api";

export interface LoginData {
    email: string;
    password: string;
}

export const login = async (data: LoginData) => {
    const response = await api.post("/login", data);

    return response.data;
};

export const logout = async () => {
    const token = localStorage.getItem("token");

    await api.post(
        "/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    localStorage.removeItem("token");
};