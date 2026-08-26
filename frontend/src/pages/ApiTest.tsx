import { useEffect, useState } from "react";
import api from "../services/api";

interface ApiResponse {
    status: string;
    message: string;
}

export default function ApiTest() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get<ApiResponse>("/health")
            .then((response) => {
                setData(response.data);
            })
            .catch(() => {
                setError("Tidak dapat terhubung ke Laravel API");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Connecting to API...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Universal POS</h1>

            <p>Status: {data?.status}</p>

            <p>{data?.message}</p>
        </div>
    );
}