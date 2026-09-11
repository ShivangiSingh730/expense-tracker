import { useState, useEffect } from "react";
import api from "../api/axios";

function ExpenseList({ refreshKey, onExpenseDeleted }) {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", amount: "", category: "" });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get("/expenses");
        setExpenses(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load expenses");
      }
    };
    fetchExpenses();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      onExpenseDeleted();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  };

  const startEdit = (exp) => {
    setEditingId(exp._id);
    setEditForm({ title: exp.title, amount: exp.amount, category: exp.category });
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (id) => {
    try {
      await api.patch(`/expenses/${id}`, {
        title: editForm.title,
        amount: Number(editForm.amount),
        category: editForm.category,
      });
      setEditingId(null);
      onExpenseDeleted();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update expense");
    }
  };

  const inputClass =
    "bg-bg border border-border rounded-lg px-2 py-1 text-text text-sm w-full focus:border-accent outline-none";

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h3 className="font-display text-lg text-text mb-4">Expenses</h3>

      {error && <p className="text-negative text-sm mb-3">{error}</p>}

      {expenses.length === 0 ? (
        <p className="text-text-muted text-sm">No expenses yet. Add your first one.</p>
      ) : (
        <ul className="space-y-2">
          {expenses.map((exp) =>
            editingId === exp._id ? (
              <li key={exp._id} className="bg-bg border border-border rounded-lg p-3 space-y-2">
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className={inputClass}
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(exp._id)}
                    className="text-sm bg-accent text-bg rounded-lg px-3 py-1 hover:bg-accent-hover transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-sm text-text-muted border border-border rounded-lg px-3 py-1 hover:text-text transition"
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ) : (
              <li
                key={exp._id}
                className="flex items-center justify-between border-b border-border pb-2 last:border-0"
              >
                <div>
                  <p className="text-text text-sm">{exp.title}</p>
                  <p className="text-text-muted text-xs capitalize">{exp.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-sm ${
                      exp.type === "income" ? "text-positive" : "text-negative"
                    }`}
                  >
                    {exp.type === "income" ? "+" : "-"}
                    {exp.amount}
                  </span>
                  <button
                    onClick={() => startEdit(exp)}
                    className="text-xs text-text-muted hover:text-accent transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="text-xs text-text-muted hover:text-negative transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;