// App.js
import React, { useState, useEffect } from 'react';
import Section from './components/Section';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
    if (newTask.title.trim() === '') {
      alert('Task title cannot be empty!');
      return;
    }
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        status: 'Pending',
      }
    ]);
    setNewTask({ title: '', description: '' });
  };

  const moveTask = (id, newStatus) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === id) {
        if (newStatus === 'In Progress') {
          return { ...task, status: 'In Progress' };
        } else if (newStatus === 'Completed') {
          return { ...task, status: 'Completed', completedAt: new Date().toLocaleString('en-GB') };
        } else {
          return { ...task, status: 'Pending' };
        }
      }
      return task;
    }));
  };

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <input 
            className="border p-2 mr-2"
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input 
            className="border p-2 mr-2"
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
        <div className="flex">
          <Section title="Pending" tasks={getTasksByStatus('Pending')} onMove={moveTask} status="In Progress" />
          <Section title="In Progress" tasks={getTasksByStatus('In Progress')} onMove={moveTask} status="Completed" />
          <Section title="Completed" tasks={getTasksByStatus('Completed')} onMove={moveTask} status="Completed" />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
