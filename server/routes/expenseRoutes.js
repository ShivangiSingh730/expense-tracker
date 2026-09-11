const { Router } = require("express");
const router = Router();
const { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense,getSummary } = require("../controllers/expenseController");
const protect = require("../middlewares/authMiddleware");

router.post("/", protect, createExpense);
router.get("/", protect, getExpenses);
router.get("/summary", protect, getSummary);
router.get("/:id", protect, getExpenseById);
router.patch("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);


module.exports = router;
