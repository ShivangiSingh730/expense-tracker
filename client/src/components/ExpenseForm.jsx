import { useState } from "react";
import api from "../api/axios";

function ExpenseForm({ onExpenseAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/expenses", { title, amount: Number(amount), type, category, date });
      setTitle("");
      setAmount("");
      setDate("");
      onExpenseAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  const inputClass =
    "w-full bg-bg border border-border rounded-lg px-3 py-2 text-text placeholder:text-text-muted focus:border-accent outline-none transition text-sm";

  return (
    <div className="bg-surface border border-border rounded-xl p-6 h-fit">
      <h3 className="font-display text-lg text-text mb-4">Add expense</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={inputClass}
        />
        <div className="grid grid-cols-2 gap-3">
          <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="bills">Bills</option>
            <option value="shopping">Shopping</option>
            <option value="fun">Fun</option>
            <option value="salary">Salary</option>
            <option value="income-other">Income - Other</option>
            <option value="other">Other</option>
          </select>
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputClass}
        />

        {error && <p className="text-negative text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-hover text-bg font-medium rounded-lg py-2.5 transition"
        >
          Add expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;