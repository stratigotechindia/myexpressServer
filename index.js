const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

//todo list app - >>> enter todos and mark them as completed

//database ==> stores all my todos
let todos = [
  { id: 1, title: "first todo", isCompleted: false },
  { id: 2, title: "second todo", isCompleted: false },
  { id: 3, title: "third todo", isCompleted: false },
];

//retrieve all the todos
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

//post a todo
app.post("/todos", (req, res) => {
  const { title, isCompleted } = req.body;
  const newTodo = {
    id: Date.now(), //unique
    title: title,
    isCompleted: isCompleted || false,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "New todo was created" });
});

//update , todo = false --> true
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id == id);
  if (todoIndex === -1) {
    return res.status(404).json({ errorMessage: "Todo with ID not found" });
  }
  // Update the todo item
  todos[todoIndex].isCompleted = isCompleted;
  res.json("Successfully updated");
});

//delete a todo
app.delete("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((todo) => todo.id == req.params.id);
  if (todoIndex == -1) {
    return res.status(404).json({ errorMessage: "Todo with ID not found" });
  }
  todos.splice(2, 1);
  res.status(200).send();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
