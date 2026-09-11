import { useBudgetContext } from "../context/BudgetContext";

export function Navbar() {

    const { theme, toggleTheme, currency, setCurrency } = useBudgetContext();

    return (

        <nav aria-label="Main navigation" style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
            
            <strong>BudgetWise</strong>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>

                <label htmlFor="currency-select">Currency</label>

                <select id="currency-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>

                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>

                </select>

                <button type="button" onClick={toggleTheme} aria-pressed={theme === "dark"}>
                    {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                </button>

            </div>

        </nav>

    );
};