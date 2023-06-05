const express = require("express");
const Todo = require("../database/Schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/UserModel");
const authenticateToken = require("../authentication/authMiddleware");

const router = express.Router();

// // jwt secret key
const JWT_KEY = "raj@@99";

// FOR TODOS

// create todo
router.post("/createtodo", authenticateToken, async (req, res) => {
  const { todo } = req.body;
  const { email } = req.user;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const newTodo = await Todo.create({
      userId: user._id,
      todo: todo,
    });
    res.json({ msg: "todo added successfully" });
    // console.log(newTodo);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// get todos
router.get("/todos", authenticateToken, async (req, res) => {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const todos = await Todo.find({ userId: user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});

// update todo
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const todo = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo item not found" });
    }

    return res.status(200).json({ msg: "todo updated successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
});

// delete todo
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo item not found" });
    }
    if (todo.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Access forbidden" });
    }

    await Todo.findByIdAndDelete(id);

    return res.status(200).json({ msg: "todo deleted successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
});

// FOR USER

//user signup
router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(401)
        .json({ msg: "user with this email already exist" });
    }

    const securedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: securedPassword,
    });
    console.log(newUser);
    return res
      .status(200)
      .json({ msg: "user registered successfully", username: username });
  } catch (error) {
    return res.status(400).json(error);
  }
});

// user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ msg: "invalid username or password" });
    }

    const token = jwt.sign({ email: user.email }, JWT_KEY);

    return res.status(200).json({ msg: "login successful", token: token });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
