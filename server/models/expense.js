const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    amount : {
        type: Number,
        required : true,
        min : 0
    },
    type : {
        type : String,
        enum : ['expense', 'income'],
        required : true
    },
    category : {
        type : String,
        enum : ['food', 'transport', 'bills', 'shopping', 'fun', 'salary', 'income-other','other'],
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    } 
},{ timestamps : true});
const Expense = model("expense", expenseSchema);
module.exports = Expense;




