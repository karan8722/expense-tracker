function PieChart({ transactions }) {

    // Get only expense transactions
    const expenses = transactions.filter(
        (t) => t.type === "expense"
    );

    // Calculate category-wise expenses
    const categoryData = {};

    expenses.forEach((t) => {
        if (!categoryData[t.category]) {
            categoryData[t.category] = 0;
        }

        categoryData[t.category] += Number(t.amount);
    });

    // Convert data into array
    const categories = Object.entries(categoryData);

    // Calculate total expenses
    const total = categories.reduce(
        (sum, item) => sum + item[1],
        0
    );

    // Chart colors
    const colors = [
        "#3498db",
        "#e74c3c",
        "#2ecc71",
        "#f1c40f",
        "#9b59b6",
        "#e67e22",
        "#1abc9c",
        "#34495e"
    ];

    // Calculate pie chart sections
    let currentPercentage = 0;

    const gradient = categories.map((item, index) => {

        const percentage = (item[1] / total) * 100;

        const start = currentPercentage;
        const end = start + percentage;

        currentPercentage = end;

        return `${colors[index % colors.length]} ${start}% ${end}%`;

    }).join(", ");

    return (
        <section className="section">

            <h2>Expense Category Analytics</h2>

            {total === 0 ? (
                <p>No expense data available.</p>
            ) : (

                <div className="chart-container">

                    <div
                        className="pie-chart"
                        style={{
                            background: `conic-gradient(${gradient})`
                        }}
                    ></div>

                    <div className="chart-legend">

                        {categories.map((item, index) => {

                            const percentage = (
                                item[1] / total
                            ) * 100;

                            return (
                                <div
                                    className="legend-item"
                                    key={item[0]}
                                >

                                    <span
                                        className="legend-color"
                                        style={{
                                            backgroundColor:
                                                colors[index % colors.length]
                                        }}
                                    ></span>

                                    <span>
                                        {item[0]}:
                                        ₹{item[1].toLocaleString("en-IN")}
                                        {" "}({percentage.toFixed(1)}%)
                                    </span>

                                </div>
                            );
                        })}

                    </div>

                </div>
            )}

            <h3>
                Total Expenses: ₹{total.toLocaleString("en-IN")}
            </h3>

        </section>
    );
}

export default PieChart;