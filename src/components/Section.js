import React from 'react';
import Task from './Task';

const Section = ({ title, tasks, onMove, onDelete }) => {
  return (
    <div className="w-full md:w-1/3 p-4"> 
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {tasks.map(task => (
        <Task key={task.id} task={task} onMove={onMove} onDelete={onDelete} /> 
      ))}
    </div>
  );
};

export default Section;
