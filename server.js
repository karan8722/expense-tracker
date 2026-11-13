
const express = require("express");

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());

// Import transaction routes
const transactionRoutes =
    require("./server/routes/transactions");

const budgetRoutes = require("./server/routes/budgets");

const exportRoutes = require("./server/routes/export");

// Connect transaction routes
app.use("/api/transactions", transactionRoutes);

app.use("/api/budgets", budgetRoutes);
app.use("/api/export", exportRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Expense Tracker Backend Running");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
