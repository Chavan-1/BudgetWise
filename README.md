BudgetWise

A personal expense and budget tracking app built to demonstrate production-grade React patterns beyond basic CRUD — proper state architecture, form UX, and accessibility, not just "it renders."

Core features

Add, filter, and review expenses with a multi-step, validated form
Category-wise and monthly spending breakdown with interactive charts
Per-category budget limits with real-time overspend warnings
Light/dark theme and multi-currency display, shared globally with no prop drilling

Architecture highlights

Custom hooks layer (useApi → useExpenses/useBudgets) — a single Axios instance wrapped in a generic request hook, extended into domain-specific hooks so adding a new resource costs ~20 lines, not a rewrite
useReducer for interdependent filter state — category, date range, and amount filters reset atomically via one RESET_FILTERS action, instead of five separate useState calls that can drift out of sync
useMemo for real aggregation work — category totals and monthly trends are computed from raw data via pure, independently-testable functions, memoized against actual data changes rather than recalculated on every unrelated re-render
useContext for cross-cutting concerns — theme and currency are available anywhere in the tree; the context value itself is memoized to avoid needlessly re-rendering consumers
Multi-step Formik + Yup wizard — a single Formik instance holds state across all steps (so "Back" never loses data), with the validation schema swapped per step
Accessible by construction, not retrofit — a reusable Modal component implements a real focus trap (Tab cycling, Escape to close, and focus restoration to the trigger element on close), and every form field uses a properly associated <label>

Stack: React (Vite), Axios, Formik, Yup, Recharts, json-server (mock REST API)

<img width="1652" height="965" alt="image" src="https://github.com/user-attachments/assets/0cfd9fa4-98cd-482e-9fce-d52d2df0241f" />
