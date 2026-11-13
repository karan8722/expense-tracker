const express = require("express");
const router = express.Router();

const { transactions } = require("../data");

// Export transactions as CSV
router.get("/", (req, res) => {

    const headers = [
        "ID",
        "Title",
        "Amount",
        "Type",
        "Category",
        "Date",
        "Recurring"
    ];

    const rows = transactions.map(t => [
        t.id,
        `"${String(t.title).replace(/"/g, '""')}"`,
        t.amount,
        t.type,
        t.category,
        t.date,
        t.recurring ? "Yes" : "No"
    ]);

    const csv = [
        headers.join(","),
        ...rows.map(row => row.join(","))
    ].join("\n");

    res.header("Content-Type", "text/csv");
    res.attachment("transactions.csv");

    res.send(csv);
});

module.exports = router;