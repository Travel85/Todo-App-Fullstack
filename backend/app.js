require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");

const connectString = process.env.MONGO_DB_CLIENT;

app.use(async (req, res, next) => {
  try {
    await mongoose.connect(connectString);
    console.log("Running connection.");
    next();
  } catch (error) {
    console.log(`Connection error: ${error}`);
  }
});

app.use(express.json());
app.use(cors());

const todoSchema = new mongoose.Schema({
  id: { type: String, required: true, default: uuidv4 },
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  done: { type: Boolean, required: true },
});

const Todo = mongoose.model("todo-24", todoSchema);

app.get("/", (req, res) => {
  res.send("Hallo Welt!");
});

app.get("/health-check", (req, res) => {
  res.status(200).send({ message: "Running backend works!" });
  console.log("Running health check!");
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});

    res.status(201).send({ todos: todos, message: "Fetch Todos" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Could not fetch todos" });
  }
});

app.post("/addTodo", async (req, res) => {
  try {
    const todoAdd = req.body;
    await Todo.create(todoAdd);
    res.status(201).send({ message: "Added new Todo" });
  } catch (error) {
    res.status(500).send({ message: "Could not add Todo" });
  }
});

app.delete("/deleteTodo/:idParam", async (req, res) => {
  try {
    const { idParam } = req.params;
    await Todo.deleteOne({ id: idParam });

    res.status(201).send({ message: "Deleted Todo!" });
  } catch (error) {
    res.status(500).send({ message: "Delete did not work" });
  }
});

app.put("/toggleTodo/:idParam", async (req, res) => {
  try {
    const { idParam } = req.params;
    const todo = await Todo.findOne({ id: idParam });
    /* if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }
  await Todo.update(todo, { $set: { done: !todo.done } }); */
    await Todo.findOneAndUpdate(
      { id: idParam },
      { $set: { done: !todo.done } }
    );
    res.status(201).send({ message: "Todo Updated!" });
  } catch (error) {
    res.status(500).send({ message: "Update did not work!" });
  }
});

app.put("/updateTitle/:idParam/:titleParam", async (req, res) => {
  try {
    const { idParam } = req.params;

    const { titleParam } = req.params;
    // console.log(`ID: ${idParam}, title: ${titleParam}`);

    //const todo = await Todo.findOne({ id: idParam });
    /*  await Todo.findOneAndUpdate(
      { id: idParam },
      { $set: { title: titleParam } }
    ); */
    const todo = await Todo.findOne({ id: idParam });
    todo.title = titleParam;
    await todo.save();

    res.status(201).send({ message: "Title updated!" });
  } catch (error) {
    res.status(500).send({ message: "Title update did not work" });
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
