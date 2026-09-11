import { useMemo, useReducer, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { useExpenses } from './hooks/useExpenses'
import { filterReducer, initialFilterState } from './reducers/filterReducer'
import { FilterPanel } from './components/FilterPanel'
import { useBudgets } from './hooks/useBudgets'
import { Dashboard } from './components/Dashboard'
import { useBudgetContext } from './context/BudgetContext'
import { Navbar } from './components/Navbar'
import { AddExpenseModal } from './components/AddExpenseModal'
import { LiveAnnouncer } from './components/LiveAnnouncer'

const categories = [
  { id: "1", name: "Groceries" },
  { id: "2", name: "Rent" },
  { id: "3", name: "Transport" },
  { id: "4", name: "Entertainment" },
  { id: "5", name: "Utilities" },
];

function App() {

  const { theme } = useBudgetContext();
  const { expenses, loading, error, addExpense } = useExpenses();
  const { budgets } = useBudgets();
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  async function handleAddExpense(values) {
    
    await addExpense(values);
    setAnnouncement(`Expense of ${values.amount} rupees added to ${values.category}`);
  }

  const filteredExpenses = useMemo(() => {

    return expenses.filter((exp) => {

      if (filters.category !== "All" && exp.category !== filters.category) return false;
      if (filters.stateDate && exp.date < filters.startDate) return false;
      if (filters.endDate && exp.date > filters.endDate) return false;
      if (filters.minAmount && exp.amount < Number(filters.minAmount)) return false;
      if (filters.maxAmount && exp.amount > Number(filters.maxAmount)) return false;

      return true;

    });

  }, [expenses, filters]);

  if (loading) return  <p>Loading expenses...</p>;
  if (error)  return <p>Error: {error}</p>;

  return (
    <div className={`app app--${theme}`}>

      <LiveAnnouncer message={announcement} />

      <Navbar />

      <button type="button" onClick={() => setIsModalOpen(true)} >+ Add Expense</button>
      
      <h1 className="visually-hidden">BudgetWise — Personal Expense Tracker</h1>

      <Dashboard expenses={expenses} budgets={budgets} />

      <FilterPanel filters={filters} dispatch={dispatch} categories={categories} />

      <ul>
        {filteredExpenses.map((expense) => (

          <li key={expense.id}>
            {expense.category} - ₹{expense.amount} ({expense.date})
          </li>

        ))}
      </ul>

      { filteredExpenses.length === 0 && 
        <p>
          No expenses match your filters.
        </p> 
      }

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExpense}
        categories={categories}
      />
    </div>
  )
}

export default App;
