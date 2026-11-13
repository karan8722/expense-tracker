
const express = require("express");

const router = express.Router();

const { transactions } = require("../data");

// GET all transactions
router.get("/", (req, res) => {
    res.json(transactions);
});

// GET transaction by ID
router.get("/:id", (req, res) => {

    const id = Number(req.params.id);

    const transaction = transactions.find(t => t.id === id);

    if (!transaction) {
        return res.status(404).json({
            message: "Transaction not found"
        });
    }

    res.json(transaction);
});

// ADD new transaction
router.post("/", (req, res) => {

    const { title, amount, type, category, date, recurring } = req.body;

    if (!title || !category || !date ||
        amount === undefined || amount === "" || !type) {

        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    if (
        !Number.isFinite(Number(amount)) ||
        Number(amount) <= 0 ||
        !["income", "expense"].includes(type)
    ) {
        return res.status(400).json({
            message: "Invalid transaction details"
        });
    }

    const newTransaction = {
        id: Date.now(),
        title,
        amount: Number(amount),
        type,
        category,
        date,
        recurring: Boolean(recurring)
    };

    transactions.push(newTransaction);

    res.status(201).json({
        message: "Transaction added successfully",
        transaction: newTransaction
    });
});

// UPDATE transaction
router.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = transactions.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Transaction not found"
        });
    }

    const { title, amount, type, category, date, recurring } = req.body;

    if (
        !title || !category || !date ||
        amount === undefined || amount === "" ||
        !["income", "expense"].includes(type) ||
        !Number.isFinite(Number(amount)) ||
        Number(amount) <= 0
    ) {
        return res.status(400).json({
            message: "Invalid transaction details"
        });
    }

    transactions[index] = {
        id,
        title,
        amount: Number(amount),
        type,
        category,
        date,
        recurring: Boolean(recurring)
    };

    res.json({
        message: "Transaction updated successfully",
        transaction: transactions[index]
    });
});

// DELETE transaction
router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = transactions.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Transaction not found"
        });
    }

    transactions.splice(index, 1);

    res.json({
        message: "Transaction deleted successfully"
    });
});

module.exports = router;
