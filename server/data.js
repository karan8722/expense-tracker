
// Store all transactions
let transactions = [
    {
        id: 1,
        title: "Monthly Salary",
        amount: 30000,
        type: "income",
        category: "Salary",
        date: "2026-11-01",
        recurring: false
    },
    {
        id: 2,
        title: "Food Shopping",
        amount: 2000,
        type: "expense",
        category: "Food",
        date: "2026-11-03",
        recurring: false
    },
    {
        id: 3,
        title: "Travel",
        amount: 1000,
        type: "expense",
        category: "Travel",
        date: "2026-11-05",
        recurring: false
    }
];

// Store monthly budgets
let budgets = [];

module.exports = {
    transactions,
    budgets
};
