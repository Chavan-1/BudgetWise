**Why I Built This**

As a backend-focused developer with 4+ years of experience in Java, Spring Boot, and enterprise systems, I wanted to go beyond tutorial-level React and actually internalize the patterns that separate a working frontend from a well-architected one.

Most learning projects treat hooks and libraries as isolated demos — a **useReducer** counter, a **useContext** theme toggle with nothing else attached. I didn't want to learn them that way. I wanted to hit the actual problems that make each pattern necessary, the same way I'd approach a real feature at work: start from a requirement, run into a limitation, and reach for the right tool because the code demanded it — not because a checklist did.

So BudgetWise was built around one constraint: every concept had to earn its place by solving a real problem in the app, not exist as a standalone example.

**useReducer** exists because five independent useState filters could drift out of sync — I needed one atomic way to reset them together.

**useMemo** exists because category totals and monthly trends are real aggregation work, not free — recalculating them on every unrelated re-render would be wasteful.

**useContext** exists because theme and currency are genuinely cross-cutting concerns that don't belong threaded through props at every layer.
Formik + Yup exist because a multi-step form has to hold state across steps without losing data on "Back" — a problem that surfaces the moment you try to build it naively.

**useRef** exists because a modal that traps keyboard focus and restores it correctly on close isn't optional polish — it's what makes the app usable without a mouse.
Accessibility wasn't a final "pass" tacked on for a checklist — it's built into the components from the start, because that's the only way it actually holds up.



**BudgetWise**

A personal expense and budget tracking app built to demonstrate production-grade React patterns beyond basic CRUD — proper state architecture, form UX, and accessibility, not just "it renders."

**Core features**

Add, filter, and review expenses with a multi-step, validated form
Category-wise and monthly spending breakdown with interactive charts
Per-category budget limits with real-time overspend warnings
Light/dark theme and multi-currency display, shared globally with no prop drilling

**Architecture highlights**

**Custom hooks layer** (useApi → useExpenses/useBudgets) — a single Axios instance wrapped in a generic request hook, extended into domain-specific hooks so adding a new resource costs 20 lines, not a rewrite

**useReducer** for interdependent filter state — category, date range, and amount filters reset atomically via one RESET_FILTERS action, instead of five separate useState calls that can drift out of sync

**useMemo** for real aggregation work — category totals and monthly trends are computed from raw data via pure, independently-testable functions, memoized against actual data changes rather than recalculated on every unrelated re-render

**useContext** for cross-cutting concerns — theme and currency are available anywhere in the tree; the context value itself is memoized to avoid needlessly re-rendering consumers

**Multi-step Formik + Yup wizard** — a single Formik instance holds state across all steps (so "Back" never loses data), with the validation schema swapped per step

Accessible by construction, not retrofit — a reusable Modal component implements a real focus trap (Tab cycling, Escape to close, and focus restoration to the trigger element on close), and every form field uses a properly associated <label>

Stack: React (Vite), Axios, Formik, Yup, Recharts, json-server (mock REST API)

<img width="1652" height="965" alt="image" src="https://github.com/user-attachments/assets/0cfd9fa4-98cd-482e-9fce-d52d2df0241f" />
