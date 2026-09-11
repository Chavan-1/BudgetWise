export function calculateCategoryTotals(expenses) {

    const totals = {};

    for (const exp of expenses) {

        totals[exp.category] = (totals[exp.category] || 0) + Number(exp.amount);

    }

    return Object.entries(totals).map(([category, total]) => ({ category, total }));

};

export function calculateMontlyTrend(expenses) {

    const monthly = {};

    for (const exp of expenses) {

        const month = exp.date.slice(0, 7);

        monthly[month] = (monthly[month] || 0) + Number(exp.amount);

    }

    return Object.entries(monthly)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, total]) => ({ month, total }));

};

export function calculateBudgetStatus(expenses, budgets) {

    const categoryTotals = calculateCategoryTotals(expenses);

    return budgets.map((budget) => {

        const spent = categoryTotals.find((c) => c.category === budget.category)?.total || 0;
        const precentUsed = Math.round((spent / budget.monthlyLimit) * 100);

        return {

            category: budget.category,
            limit: budget.monthlyLimit,
            spent,
            precentUsed,
            exceeded: spent > budget.monthlyLimit,

        };

    });

};