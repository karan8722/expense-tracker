import { useEffect, useState } from "react";
import { getData, sendData } from "./api";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";


function App() {

    // Store transactions
    const [transactions, setTransactions] = useState([]);

    // Store editing transaction ID
    const [editId, setEditId] = useState(null);

    // Store transaction form details
    const [form, setForm] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "Food",
        date: new Date().toISOString().slice(0, 10),
        recurring: false
    });

    const [message, setMessage] = useState("");

    // Store budgets
    const [budgets, setBudgets] = useState([]);

    // Budget form
    const [budgetForm, setBudgetForm] = useState({
        category: "Food",
        amount: "",
        month: new Date().toISOString().slice(0, 7)
    });

    // Calculate income
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((total, t) => total + t.amount, 0);

    // Calculate expenses
    const expenses = transactions
        .filter(t => t.type === "expense")
        .reduce((total, t) => total + t.amount, 0);

    // Calculate balance
    const balance = income - expenses;
    // Calculate savings percentage
const savingsPercentage = income > 0
    ? ((balance / income) * 100).toFixed(1)
    : 0;

    // Get transactions from backend
    async function loadTransactions() {
        try {
            const data = await getData("/transactions");
            setTransactions(data);
        } catch (error) {
            setMessage(error.message);
        }
    }

    // Get budgets from backend
    async function loadBudgets() {
        try {
            const data = await getData("/budgets");
            setBudgets(data);
        } catch (error) {
            setMessage(error.message);
        }
    }

    // Load data when page opens
    useEffect(() => {
        loadTransactions();
        loadBudgets();
    }, []);

    // Handle transaction form changes
    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    }

    // Handle budget form changes
    function handleBudgetChange(event) {
        const { name, value } = event.target;

        setBudgetForm({
            ...budgetForm,
            [name]: value
        });
    }

    // Save budget
    async function handleBudgetSubmit(event) {
        event.preventDefault();

        try {
            await sendData("/budgets", "POST", {
                category: budgetForm.category,
                amount: Number(budgetForm.amount),
                month: budgetForm.month
            });

            setMessage("Budget saved successfully!");

            setBudgetForm({
                category: "Food",
                amount: "",
                month: new Date().toISOString().slice(0, 7)
            });

            await loadBudgets();

        } catch (error) {
            setMessage(error.message);
        }
    }

    // Add or update transaction
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            // Check whether we are editing or adding
            const url = editId
                ? "/transactions/" + editId
                : "/transactions";

            const method = editId ? "PUT" : "POST";

            await sendData(url, method, {
                ...form,
                amount: Number(form.amount)
            });

            if (editId) {
                setMessage("Transaction updated successfully!");
            } else {
                setMessage("Transaction added successfully!");
            }

            // Reset editing ID
            setEditId(null);

            // Clear form
            setForm({
                title: "",
                amount: "",
                type: "expense",
                category: "Food",
                date: new Date().toISOString().slice(0, 10),
                recurring: false
            });

            // Refresh transactions and budgets
            await loadTransactions();
            await loadBudgets();

        } catch (error) {
            setMessage(error.message);
        }
    }

    // Edit transaction
    function editTransaction(item) {
        setEditId(item.id);

        setForm({
            title: item.title,
            amount: String(item.amount),
            type: item.type,
            category: item.category,
            date: item.date,
            recurring: item.recurring
        });

        window.scrollTo(0, 0);
    }

    // Cancel editing
    function cancelEdit() {
        setEditId(null);

        setForm({
            title: "",
            amount: "",
            type: "expense",
            category: "Food",
            date: new Date().toISOString().slice(0, 10),
            recurring: false
        });
    }

    // Delete transaction
    async function deleteTransaction(id) {
        const confirmDelete = window.confirm(
            "Do you want to delete this transaction?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await sendData(
                "/transactions/" + id,
                "DELETE",
                {}
            );

            setMessage("Transaction deleted successfully!");

            await loadTransactions();
            await loadBudgets();

        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div className="container">

            <header>
                <h1>Expense Tracker</h1>
                <p>Manage your income and expenses</p>
            </header>

            {message && (
                <div className="message">
                    {message}

                    <button onClick={() => setMessage("")}>
                        Close
                    </button>
                </div>
            )}

            {/* Dashboard */}
            <h2>Dashboard</h2>

            <div className="dashboard">

                <div className="card income">
                    <h3>Total Income</h3>
                    <h2>₹{income.toLocaleString("en-IN")}</h2>
                </div>

                <div className="card expense">
                    <h3>Total Expenses</h3>
                    <h2>₹{expenses.toLocaleString("en-IN")}</h2>
                </div>

                <div className="card balance">
                    <h3>Available Balance</h3>
                    <h2>₹{balance.toLocaleString("en-IN")}</h2>
                </div>

                <div className="card savings">
    <h3>Savings Percentage</h3>
    <h2>{savingsPercentage}%</h2>
    <p>Percentage of income remaining</p>
</div>

            </div>
            {/* Export Transactions */}
<section className="section">
    <h2>Export Transactions</h2>

    <button
        onClick={() => {
            window.location.href = "/api/export";
        }}
    >
        Download CSV
    </button>
</section>

            {/* Add or Edit Transaction */}
            <section className="section">

                <h2>
                    {editId ? "Edit Transaction" : "Add Transaction"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <label>Transaction Title</label>

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <label>Amount</label>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        min="0.01"
                        step="0.01"
                        value={form.amount}
                        onChange={handleChange}
                        required
                    />

                    <label>Transaction Type</label>

                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    <label>Category</label>

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    >
                        <option>Food</option>
                        <option>Travel</option>
                        <option>Shopping</option>
                        <option>Salary</option>
                        <option>Education</option>
                        <option>Health</option>
                        <option>Entertainment</option>
                        <option>Other</option>
                    </select>

                    <label>Date</label>

                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                    />

                    <label className="checkbox-label">

                        <input
                            type="checkbox"
                            name="recurring"
                            checked={form.recurring}
                            onChange={handleChange}
                        />

                        Recurring Transaction

                    </label>

                    <button type="submit">
                        {editId ? "Update Transaction" : "Add Transaction"}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="cancel"
                        >
                            Cancel Edit
                        </button>
                    )}

                </form>

            </section>

            {/* Budget Form */}
            <section className="section">

                <h2>Set Monthly Budget</h2>

                <form onSubmit={handleBudgetSubmit}>

                    <label>Category</label>

                    <select
                        name="category"
                        value={budgetForm.category}
                        onChange={handleBudgetChange}
                    >
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                    </select>

                    <label>Monthly Budget Amount (₹)</label>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Enter budget amount"
                        min="1"
                        value={budgetForm.amount}
                        onChange={handleBudgetChange}
                        required
                    />

                    <label>Month</label>

                    <input
                        type="month"
                        name="month"
                        value={budgetForm.month}
                        onChange={handleBudgetChange}
                        required
                    />

                    <button type="submit">
                        Save Budget
                    </button>

                </form>

            </section>

            {/* Budget List */}
<section className="section">

    <h2>Monthly Budgets</h2>

    {budgets.length === 0 ? (
        <p>No budgets added yet.</p>
    ) : (
        <div className="budget-list">

            {budgets.map((budget) => {

                const spent = budget.spent || 0;
                const amount = budget.amount || 0;

                const percentage = amount > 0
                    ? Math.min((spent / amount) * 100, 100)
                    : 0;

                return (
                    <div className="budget-card" key={budget.id}>

                        <h3>{budget.category}</h3>

                        <p>Month: {budget.month}</p>

                        <p>
                            Budget: ₹{amount.toLocaleString("en-IN")}
                        </p>

                        <p>
                            Spent: ₹{spent.toLocaleString("en-IN")}
                        </p>

                        <p>
                            Remaining: ₹
                            {(budget.remaining ?? amount - spent)
                                .toLocaleString("en-IN")}
                        </p>

                        <div className="progress">
                            <div
                                className="progress-fill"
                                style={{ width: percentage + "%" }}
                            ></div>
                        </div>

                        <p>{percentage.toFixed(1)}% used</p>

                        {budget.exceeded && (
                            <p className="alert">
                                Budget exceeded!
                            </p>
                        )}

                        {!budget.exceeded && (
                            <p className="success">
                                Within budget
                            </p>
                        )}

                    </div>
                );
            })}

        </div>
    )}

</section>
{/* Expense Pie Chart */}
<PieChart transactions={transactions} />

<BarChart transactions={transactions} />

            {/* Transaction List */}
            <section className="section">

                <h2>All Transactions</h2>

                <div className="table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Recurring</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {transactions.map(t => (

                                <tr key={t.id}>

                                    <td>{t.title}</td>

                                    <td>
                                        ₹{t.amount.toLocaleString("en-IN")}
                                    </td>

                                    <td>{t.type}</td>

                                    <td>{t.category}</td>

                                    <td>{t.date}</td>

                                    <td>
                                        {t.recurring ? "Yes" : "No"}
                                    </td>

                                    <td>

                                        <button
                                            className="edit"
                                            onClick={() => editTransaction(t)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete"
                                            onClick={() => deleteTransaction(t.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                            {transactions.length === 0 && (
                                <tr>
                                    <td colSpan="7">
                                        No transactions available
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

            </section>

        </div>
    );
}

export default App;