// Section.js
import React from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';

const Section = ({ title, tasks, onMove, status }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => onMove(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [status]);

  return (
    <div ref={drop} className={`w-1/3 p-4 ${isOver ? 'bg-blue-100' : ''}`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Section;
