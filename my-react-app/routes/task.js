const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Admin assigns task
router.post("/assign", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied: Admins only" });

  const { userId, description } = req.body;

  try {
    const task = new Task({ assignedTo: userId, description });
    await task.save();
    res.status(201).json({ message: "Task assigned" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tasks for logged-in user
router.get("/my-tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.userId }).populate("assignedTo", "username");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
