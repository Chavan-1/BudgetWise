import { useCallback, useEffect, useState } from "react";
import { useApi } from "./useApi";

export function useBudgets() {

    const [budgets, setBudgets] = useState([]);
    const { request, loading, error } = useApi();

    const fetchBudgets = useCallback(async () => {

        const data = await request({ url: "/budgets", method: "GET" });

        setBudgets(data);

    }, [request]);

    useEffect(() => {

        fetchBudgets();

    }, [fetchBudgets]);

    return { budgets, loading, error };

};