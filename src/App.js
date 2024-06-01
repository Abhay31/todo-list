import React, { useState, useEffect } from 'react';
import Section from './components/Section';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    // Validate title before adding task
    if (newTask.title.trim() === '') {
      alert('Please enter a title for the task.');
      return;
    }

    setTasks([...tasks, { 
      id: Date.now().toString(), 
      title: newTask.title, 
      description: newTask.description, 
      status: 'Pending' 
    }]);
    setNewTask({ title: '', description: '' });
  };

  const moveTask = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        if (task.status === 'Pending') {
          return { ...task, status: 'In Progress' };
        } else if (task.status === 'In Progress') {
          return { ...task, status: 'Completed', completedAt: new Date().toLocaleString('en-GB') };
        }
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex flex-wrap items-center">
        <input 
          className="border p-2 mr-2 w-full md:w-auto mb-2 md:mb-0"
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input 
          className="border p-2 mr-2 w-full md:w-auto mb-2 md:mb-0"
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className="flex flex-wrap">
        <Section title="Pending" tasks={getTasksByStatus('Pending')} onMove={moveTask} onDelete={deleteTask} />
        <Section title="In Progress" tasks={getTasksByStatus('In Progress')} onMove={moveTask} onDelete={deleteTask} />
        <Section title="Completed" tasks={getTasksByStatus('Completed')} onMove={moveTask} onDelete={deleteTask} />
      </div>
    </div>
  );
};

export default App;
