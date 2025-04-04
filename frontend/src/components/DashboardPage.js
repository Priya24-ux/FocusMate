

import React, { useState, useEffect } from "react";
import PomodoroTimer from './PomodoroTimer';




const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
        
    //      const data = await response.json();
    // console.log("Fetched Tasks:", data); // ✅ Debugging step

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
        setTasks(data);
        console.log("Fetched Tasks:", data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!taskText.trim()) return; // Prevent adding empty tasks

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ text: taskText }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      setTaskText(""); // Clear input field
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update an existing task
  const updateTask = async (taskId, updatedText) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ text: updatedText }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      if (!response.ok) throw new Error("Failed to delete task");

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Task Management</h2>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => updateTask(task._id, prompt("Enter new text:", task.text))}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
          </ul>
      {/* Add Pomodoro Timer below the task management */}
      <PomodoroTimer />
    </div>
  );
};

export default DashboardPage;

















































