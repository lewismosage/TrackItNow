import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './ToDoList.css';

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    'Run payroll',
    'Review time off request',
    'Sign board resolution',
    'Finish onboarding Tony',
    'Prepare for board meeting',
  ]);

  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  // Edit an existing task
  const handleEditTask = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setNewTask(tasks[index]);
  };

  const handleUpdateTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex] = newTask;
      setTasks(updatedTasks);
      setNewTask('');
      setIsEditing(false);
      setCurrentTaskIndex(null);
    }
  };

  // Delete a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list-container">
      <div className="todo-header">
        <h3 className="todo-title">To-Do List</h3>
      </div>

      <ul className="todo-items">
        {tasks.map((task, index) => (
          <li key={index} className="todo-item">
            <input type="checkbox" id={`task-${index}`} />
            <label htmlFor={`task-${index}`}>{task}</label>
            <button className="edit-btn" onClick={() => handleEditTask(index)}>
              <FaEdit />
            </button>
            <button className="delete-btn" onClick={() => handleDeleteTask(index)}>
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>

      {/* Add/Edit Task Input */}
      <div className="task-input-container">
        <input
          type="text"
          placeholder={isEditing ? 'Edit task' : 'Add new task'}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        {isEditing ? (
          <button className="update-task-btn" onClick={handleUpdateTask}>
            Update Task
          </button>
        ) : (
          <button className="add-task-btn" onClick={handleAddTask}>
            Add Task
          </button>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
