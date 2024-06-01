// Task.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [task.id]);

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded shadow mb-4 ${isDragging ? 'opacity-50' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h3 className="font-bold text-lg">{task.title}</h3>
      {task.description && <p className="text-gray-600">{task.description}</p>}
      {task.status === 'Completed' && <p className="text-gray-500 text-sm mt-2">Completed at: {task.completedAt}</p>}
    </div>
  );
};

export default Task;
