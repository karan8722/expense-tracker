function BarChart({ transactions }) {

    // Store monthly income and expenses
    const monthlyData = {};

    transactions.forEach((t) => {

        const month = t.date.slice(0, 7);

        if (!monthlyData[month]) {
            monthlyData[month] = {
                income: 0,
                expense: 0
            };
        }

        if (t.type === "income") {
            monthlyData[month].income += Number(t.amount);
        } else if (t.type === "expense") {
            monthlyData[month].expense += Number(t.amount);
        }

    });

    const months = Object.keys(monthlyData).sort();

    // Find highest amount for chart scaling
    const maxAmount = Math.max(
        1,
        ...months.flatMap((month) => [
            monthlyData[month].income,
            monthlyData[month].expense
        ])
    );

    return (
        <section className="section">

            <h2>Monthly Income vs Expenses</h2>

            {months.length === 0 ? (
                <p>No transaction data available.</p>
            ) : (

                <div className="bar-chart">

                    {months.map((month) => {

                        const income = monthlyData[month].income;
                        const expense = monthlyData[month].expense;

                        return (
                            <div className="bar-group" key={month}>

                                <div className="bars">

                                    <div
                                        className="bar income-bar"
                                        style={{
                                            height: (income / maxAmount) * 200 + "px"
                                        }}
                                        title={`Income: ₹${income}`}
                                    ></div>

                                    <div
                                        className="bar expense-bar"
                                        style={{
                                            height: (expense / maxAmount) * 200 + "px"
                                        }}
                                        title={`Expenses: ₹${expense}`}
                                    ></div>

                                </div>

                                <p>{month}</p>

                                <small>
                                    Income: ₹{income.toLocaleString("en-IN")}
                                </small>

                                <small>
                                    Expense: ₹{expense.toLocaleString("en-IN")}
                                </small>

                            </div>
                        );
                    })}

                </div>
            )}

            <div className="chart-legend">
                <span>🟢 Income</span>
                <span>🔴 Expenses</span>
            </div>

        </section>
    );
}

export default BarChart;