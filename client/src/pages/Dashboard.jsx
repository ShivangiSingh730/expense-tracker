import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/expenses/summary");
        setSummary(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load summary");
      }
    };
    fetchSummary();
  }, [refreshKey]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDataChanged = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="border-b border-border px-8 py-5 flex items-center justify-between">
        <h1 className="font-display text-xl text-text">Ledger</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-text-muted hover:text-text border border-border rounded-lg px-3 py-1.5 transition"
        >
          Logout
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-10">
        {error && <p className="text-negative mb-6">{error}</p>}

        {/* Summary stat row */}
        {summary && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-surface border border-border rounded-xl p-5">
              <p className="text-text-muted text-sm mb-1">Income</p>
              <p className="font-mono text-2xl text-positive">
                {summary.totalIncome}
              </p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <p className="text-text-muted text-sm mb-1">Expense</p>
              <p className="font-mono text-2xl text-negative">
                {summary.totalExpense}
              </p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <p className="text-text-muted text-sm mb-1">Balance</p>
              <p
                className={`font-mono text-2xl ${
                  summary.balance < 0 ? "text-negative" : "text-positive"
                }`}
              >
                {summary.balance}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseForm onExpenseAdded={handleDataChanged} />
          <ExpenseList refreshKey={refreshKey} onExpenseDeleted={handleDataChanged} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;