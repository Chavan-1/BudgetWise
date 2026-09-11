import { createContext, useState, useMemo, useContext } from "react";

const BudgetContext = createContext(undefined);

const CURRENCY_SYMBOLS = {
    INR: "₹",
    USD: "$",
    EUR: "€",
};

export function BudgetProvider({ children }) {

    const [theme, setTheme] = useState("light");
    const [currency, setCurrency] = useState("INR");
   
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const value = useMemo(() => ({
        theme, 
        toggleTheme,
        currency,
        setCurrency,
        currencySymbol: CURRENCY_SYMBOLS[currency],
    }),
    [theme, currency]);

    return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>

};

export function useBudgetContext() {

    const context = useContext(BudgetContext);

    if (context === undefined) {
        throw new Error("useBudgetContext must be used within a BudgetProvider");
    }

    return context;
}