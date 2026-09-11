import { useCallback, useState } from "react";
import api from "../api/axios";

export function useApi() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (config) => {

        setLoading(true);
        setError(null);

        try {

            const response = await api(config);
            return response.data;

        } catch (error) {

            setError(error.message || "Something went wrong");
            throw error;

        } finally {

            setLoading(false);
        }
    }, []);

    return {
        request,
        loading,
        error
    };
};