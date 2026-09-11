import { useEffect, useMemo } from "react";
import { calculateBudgetStatus, calculateCategoryTotals, calculateMontlyTrend } from "../utils/analytics";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useBudgetContext } from "../context/BudgetContext";

const COLORS = ["#4CAF50", "#F44336", "#2196F3", "#9C27B0", "#FF9800"];

export function Dashboard({ expenses, budgets }) {

    const categoryTotals = useMemo(() => calculateCategoryTotals(expenses), [expenses]);
    const monthlyTrend = useMemo(() => calculateMontlyTrend(expenses), [expenses]);
    const budgetStatus = useMemo(() => calculateBudgetStatus(expenses, budgets), [expenses, budgets]);
    const totalSpend = useMemo(() => expenses.reduce((sum, exp) => sum + Number(exp.amount), 0), [expenses]);
    const { currencySymbol } = useBudgetContext();
    
    return (

        <section aria-label="Spending analytics">

            <h2>Dashboard</h2>

            <p>Total spend: {currencySymbol}{totalSpend}</p>

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>

                <div style={{ width: 300, height: 300 }}>
                    <h3>By Category</h3>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={categoryTotals} dataKey="total" nameKey="category" outerRadius={100} label>

                                {categoryTotals.map((_, index) => (

                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />

                                ))}

                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ width: 400, height: 300 }}>
                    <h3>Monthly Trend </h3>
                    <ResponsiveContainer>
                        <BarChart data={monthlyTrend}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Bar dataKey="total" fill="#2196F3" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

            <h3>Budget Status</h3>

            <ul>
                {budgetStatus.map((b) => (

                    <li key={b.category}>
                        {b.category}: {currencySymbol}{b.spent} / {currencySymbol}{b.limit} ({b.percentUsed}%)
                        {b.exceeded && <strong style={{ color: "#F44336" }}> ⚠ Over budget</strong>}
                    </li>

                ))};
            </ul>

        </section>

    );

};