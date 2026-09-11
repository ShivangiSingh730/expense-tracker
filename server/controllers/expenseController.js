const Expense = require("../models/expense");

const createExpense = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;
    const expense = await Expense.create({ title, amount, type, category, date, user: req.user._id, });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one expense by id
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE an expense
const updateExpense = async (req, res) => {
  try {
  const expense = await Expense.findOneAndUpdate(
  { _id: req.params.id, user: req.user._id },
  req.body,
  { new: true, runValidators: true }
);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE an expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const totals = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const byCategory = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalIncome = totals.find((t) => t._id === "income")?.total || 0;
    const totalExpense = totals.find((t) => t._id === "expense")?.total || 0;

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      byCategory: byCategory.map((c) => ({ category: c._id, total: c.total })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense, getSummary };