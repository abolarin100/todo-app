import React from 'react';
import { Link } from 'react-router-dom';

const TodoItem = ({ todo, onEdit, onDelete, onToggleCompleted }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-200 p-4 rounded mb-2 gap-3">
      <div className="flex items-center flex-wrap">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggleCompleted}
          className="mr-2"
        />
        <span
          className={`text-sm sm:text-base ${
            todo.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {todo.title}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 justify-start md:justify-end w-full md:w-auto">
        <Link
          to={`/todos/${todo.id}`}
          className="bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
        >
          View Details
        </Link>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
          onClick={() => onEdit(todo)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
