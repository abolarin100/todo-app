import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTodosFromDB, updateTodoInDB } from '../db/dexieDb';
import { updateTodo } from '../services/todoService';

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTodoDetails();
  }, [id]);

  const loadTodoDetails = async () => {
    setIsLoading(true);
    try {
      // Try to get the todo from Dexie first
      const todos = await getTodosFromDB();
      const selectedTodo = todos.find((item) => item.id === parseInt(id));
      
      if (selectedTodo) {
        setTodo(selectedTodo);
      } else {
        setError('Todo not found');
      }
    } catch (error) {
      console.error('Failed to load todo:', error);
      setError('Failed to load todo details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleCompleted = async () => {
    if (!todo) return;

    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      
      // Try to update both API and Dexie
      const result = await updateTodo(todo.id, updatedTodo);
      setTodo(result);
      
    } catch (error) {
      console.error('Failed to update todo:', error);
      // Even if API fails, update local Dexie
      await updateTodoInDB(todo.id, { ...todo, completed: !todo.completed });
      setTodo(prev => ({ ...prev, completed: !prev.completed }));
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 mx-auto"></div>
            <div className="h-32 bg-gray-100 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <p>Todo not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Todo Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">ID: {todo.id}</h2>
          <p className="text-gray-600 mb-4">{todo.title}</p>
          <div className="flex items-center mb-4">
            <span className="mr-2">Status:</span>
            <button
              onClick={handleToggleCompleted}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                todo.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {todo.completed ? 'Completed' : 'Pending'}
            </button>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Back to List
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;