const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require('./database/db')
const Todo = require('./models/Todo')

db()
const app = express()


app.use(bodyParser.json())
app.use(cors())

app.post("/add-todo", async (req, res) => {
    try {
        let todo = await Todo.create({
            "todo": req.body.todo
        })
        res.status(200).json({ "msg": "hello world" })
    } catch (err) {
        console.error("Error:", error);
        res.status(500).json({ "error": "Internal Server Error" });
    }
})

app.post("/get-todos", async (req, res) => {
    try {
        const todo = await Todo.find()
        res.status(200).json({ todo })
    } catch (err) {
        console.error("Error:", error);
        res.status(500).json({ "error": "Internal Server Error" });
    }
})

app.post("/update-todo", async (req, res) => {
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { "todo": req.body.oldTodo }, 
            { $set: { "todo": req.body.newTodo } },
        );
        if (updatedTodo) {
            res.status(200).json({ "msg": "Updated", "todo": updatedTodo });
        } else {
            res.status(404).json({ "error": "Todo not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ "error": "Internal Server Error" });
    }
});

app.post("/remove-todo", async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ "todo": req.body.todo });
        res.status(200).json({ "msg": "Deleted", "todo": todo });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ "error": "Internal Server Error" });
    }

})

const PORT = 8080
app.listen(PORT, () => {
    console.log("Server listening on " + PORT)
})