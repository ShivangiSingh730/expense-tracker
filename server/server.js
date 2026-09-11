require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen( PORT , () => {
    console.log(`Server running at port ${PORT}`)
});


