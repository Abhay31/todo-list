import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Task = ({ task, onMove, onDelete }) => {
  const handleDelete = () => {
    onDelete(task.id); // Call onDelete with task ID
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center">
        <div className="w-full md:w-4/5"> {/* Adjust width for responsiveness */}
          <h3 className="font-bold text-lg">{task.title}</h3>
          {task.description && <p className="text-gray-600">{task.description}</p>}
          {task.status === 'Completed' && <p className="text-gray-500 text-sm mt-2">Completed at: {task.completedAt}</p>}
        </div>
        <div className="flex items-center w-full md:w-1/5 justify-end"> {/* Adjust width for responsiveness */}
          {task.status !== 'Completed' && (
            <button 
              className="mt-2 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => onMove(task.id)}
            >
              {task.status === 'Pending' ? 'Start' : 'Complete'}
            </button>
          )}
          <button 
            className="mt-2 md:mt-0 bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete} // Call handleDelete on click
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
