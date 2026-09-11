import { useCallback, useEffect, useState } from "react";
import { useApi } from "./useApi";

export function useExpenses() {

    const [expenses, setExpenses] = useState([]);
    const { request, loading, error  } = useApi();

    const fetchExpenses = useCallback(async () => {

        const data = await request({ url: "/expenses", method: "GET" });
        setExpenses(data);

    }, [request]);

    const addExpense = useCallback(
        
        async (expense) => {

            const newExpense = await request({
                url: "/expenses",
                method: "POST",
                data: expense,
            });
            
            setExpenses((prev) => [...prev, newExpense]);
        },
        [request]
    );

    const deleteExpense = useCallback(
        async (id) => {

            await request ({ 
                url:  `/expense/${id}`,
                method: "DELETE"
            });

            setExpenses((prev) => 
                prev.filter((e) => e.id !== id)
        );
        },
        [request]
    );

    const updateExpense = useCallback(

        async (id, updates) => {

            const updated = await request({

                url: `/expenses/${id}`,
                method: "PUT",
                data: update,
            });
            setExpenses((prev) => 
                prev.map((e) => (
                    e.id === id ? updated : e
                ))
            );
        },
        [request]
    );

    useEffect(() => {

        fetchExpenses();

    }, [fetchExpenses]);

    return {
        expenses,
        loading,
        error,
        addExpense,
        deleteExpense,
        updateExpense,
        refetch: fetchExpenses
    };
}