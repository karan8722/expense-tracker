
const express = require("express");

const router = express.Router();
console.log("Budget routes loaded successfully");

const { budgets, transactions } = require("../data");

// GET all budgets
router.get("/", (req, res) => {

    const result = budgets.map(budget => {

        // Calculate category expenses for selected month
        const spent = transactions
            .filter(t =>
                t.type === "expense" &&
                t.category === budget.category &&
                t.date.startsWith(budget.month)
            )
            .reduce((total, t) => total + t.amount, 0);

        return {
            ...budget,
            spent: spent,
            remaining: budget.amount - spent,
            exceeded: spent > budget.amount
        };

    });

    res.json(result);
});

// ADD or UPDATE budget
router.post("/", (req, res) => {

    const { category, amount, month } = req.body;

    // Validate data
    if (
        !category ||
        !month ||
        amount === undefined ||
        amount === "" ||
        !Number.isFinite(Number(amount)) ||
        Number(amount) <= 0 ||
        !/^\d{4}-(0[1-9]|1[0-2])$/.test(month)
    ) {
        return res.status(400).json({
            message: "Please enter valid budget details"
        });
    }

    // Check existing budget
    const existingBudget = budgets.find(b =>
        b.category === category &&
        b.month === month
    );

    // Update existing budget
    if (existingBudget) {

        existingBudget.amount = Number(amount);

        return res.json({
            message: "Budget updated successfully",
            budget: existingBudget
        });
    }

    // Create new budget
    const newBudget = {
        id: Date.now(),
        category: category,
        amount: Number(amount),
        month: month
    };

    budgets.push(newBudget);

    res.status(201).json({
        message: "Budget added successfully",
        budget: newBudget
    });

});

module.exports = router;
