const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    todo : String,
})

const Todo = mongoose.model("Todo",TodoSchema)
module.exports = Todo