// // routes/tasks.js
// const express = require('express');
// const Task = require('../models/Task');
// const authMiddleware = require('../middleware/auth'); // To verify the JWT token
// const router = express.Router();

// // Get all tasks for a specific user
// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.userId });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Add a new task
// router.post('/', authMiddleware, async (req, res) => {
//   const { text } = req.body;
//   try {
//     const newTask = new Task({
//       text,
//       userId: req.userId,
//     });
//     await newTask.save();
//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Update a task
// router.put('/:id', authMiddleware, async (req, res) => {
//   const { text } = req.body;
//   try {
//     const task = await Task.findOneAndUpdate(
//       { _id: req.params.id, userId: req.userId },
//       { text },
//       { new: true }
//     );
//     if (!task) return res.status(404).json({ message: 'Task not found' });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Delete a task
// router.delete('/:id', authMiddleware, async (req, res) => {
//   try {
//     const task = await Task.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.userId,
//     });
//     if (!task) return res.status(404).json({ message: 'Task not found' });
//     res.json({ message: 'Task deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;




const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware'); // Reference the existing auth middleware
const router = express.Router();

// Get all tasks for a specific user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new task
router.post('/', authMiddleware, async (req, res) => {
  const { text } = req.body;
  try {
    const newTask = new Task({
      text,
      userId: req.userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  const { text } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { text },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

















// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');

// // Define Task schema
// const TaskSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
// });

// // Create Task model
// const Task = mongoose.model('Task', TaskSchema);

// // Route to add a new task
// router.post('/add', async (req, res) => {
//   try {
//     const { text, userId } = req.body;

//     if (!text || !userId) {
//       return res.status(400).json({ message: "Text and userId are required" });
//     }

//     const task = new Task({ text, userId });
//     await task.save();

//     res.status(201).json({ message: "Task added successfully", task });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// // Route to get all tasks
// router.get('/', async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// module.exports = router;
