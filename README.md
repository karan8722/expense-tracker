# Expense Tracker with Analytics

A full-stack web application built using React.js, Node.js, and Express.js to manage personal income, expenses, and monthly budgets. It provides an interactive dashboard with expense analytics, budget tracking, and CSV export functionality.

## 🚀 Features

### 1. Dashboard
- View total income.
- View total expenses.
- Calculate available balance.
- Display savings percentage.

### 2. Transaction Management
- Add new income and expense transactions.
- Edit existing transactions.
- Delete transactions.
- Select transaction categories.
- Track recurring transactions.
- View complete transaction history.

### 3. Monthly Budget Management
- Create monthly budgets.
- Select expense categories.
- Update existing budgets.
- Calculate category-wise spending.
- Display remaining budget.
- Identify exceeded budgets.
- Show budget spending progress.

### 4. Expense Analytics
- Expense category Pie Chart.
- Monthly Income vs Expenses Bar Chart.
- Category-wise expense percentages.
- Visual representation of financial activities.

### 5. CSV Export
- Download transaction history.
- Export transaction details in CSV format.
- Open exported data in spreadsheet applications.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| HTML5 | Web page structure |
| CSS3 | Styling and responsive layout |
| Node.js | Backend runtime |
| Express.js | REST API development |
| Vite | Frontend development server |
| Fetch API | Frontend-backend communication |
| Git & GitHub | Version control |

**Data Storage:** In-memory JavaScript arrays.

## 📁 Project Structure

```text
expense-tracker/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BarChart.jsx
│   │   │   └── PieChart.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── style.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── routes/
│   │   ├── transactions.js
│   │   ├── budgets.js
│   │   └── export.js
│   │
│   └── data.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the application:

- Node.js
- npm
- Visual Studio Code
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/karan8722/expense-tracker.git
```

### Step 2: Navigate to the Project

```bash
cd expense-tracker
```

### Step 3: Install Backend Dependencies

```bash
npm install
```

### Step 4: Install Frontend Dependencies

```bash
cd client
npm install
```

## ▶️ How to Run the Application

The frontend and backend must run in separate terminals.

### Terminal 1: Start Backend

Navigate to the main project folder:

```bash
cd expense-tracker
```

Run:

```bash
npm start
```

Backend URL:

```text
http://localhost:5000
```

### Terminal 2: Start Frontend

Navigate to the client folder:

```bash
cd expense-tracker/client
```

Run:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Open the frontend URL in your browser to use the application.

## 🔗 API Endpoints

### Transactions

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/transactions/:id` | Get transaction by ID |
| POST | `/api/transactions` | Add transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

### Budgets

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/budgets` | Get all budgets |
| POST | `/api/budgets` | Add or update budget |

### Export

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/export` | Download transactions as CSV |





## 💡 Future Enhancements

- Database integration using MongoDB.
- User registration and login.
- Authentication and authorization.
- Advanced transaction search and filtering.
- Date-wise financial reports.
- Downloadable PDF reports.
- Responsive mobile-friendly dashboard.

## 👨‍💻 Author

**Karan Biradar**

GitHub: https://github.com/karan8722

Project Repository: https://github.com/karan8722/expense-tracker

## 📄 License

This project is developed for learning and educational purposes.
