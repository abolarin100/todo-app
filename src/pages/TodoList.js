import React, { useEffect, useState } from 'react';
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../services/todoService';
import TodoItem from '../components/TodoItem';
import TodoModal from '../components/TodoModal';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const todosPerPage = 10;

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTodos();
      setTodos(data);
      setFilteredTodos(data);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleCompleted = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      const result = await updateTodo(todo.id, updatedTodo);
      
      setTodos(prevTodos => 
        prevTodos.map(t => t.id === todo.id ? result : t)
      );
      
      setFilteredTodos(prevFiltered =>
        prevFiltered.map(t => t.id === todo.id ? result : t)
      );
    } catch (error) {
      console.error('Failed to toggle todo completion:', error);
    }
  };

  const handleSave = async (todoData) => {
    setIsLoading(true);
    try {
      if (currentTodo) {
        const updatedTodo = {
          ...currentTodo,
          ...todoData
        };
        const result = await updateTodo(currentTodo.id, updatedTodo);
        setTodos(prevTodos =>
          prevTodos.map(t => t.id === currentTodo.id ? result : t)
        );
        setFilteredTodos(prevFiltered =>
          prevFiltered.map(t => t.id === currentTodo.id ? result : t)
        );
      } else {
        const result = await addTodo(todoData);
        setTodos(prevTodos => [result, ...prevTodos]);
        setFilteredTodos(prevFiltered => [result, ...prevFiltered]);
      }
      closeModal();
    } catch (error) {
      console.error('Failed to save todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      setFilteredTodos(prevFiltered => prevFiltered.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTodos(filtered);
    setCurrentPage(1);
  };

  const openModal = (todo = null) => {
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTodo(null);
  };

  const currentTodos = filteredTodos.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );

  if (isLoading && !todos.length) {
    return <div className="p-6 text-center">Loading todos...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => openModal()}
          className="px-4 py-2 h-10 whitespace-nowrap bg-blue-500  text-white rounded hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
        New Todo
        </button>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="space-y-2">
        {currentTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={() => openModal(todo)}
            onDelete={() => handleDelete(todo.id)}
            onToggleCompleted={() => handleToggleCompleted(todo)}
          />
        ))}
      </div>
      
      {filteredTodos.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No todos found
        </div>
      )}
      
      <Pagination
        totalTodos={filteredTodos.length}
        todosPerPage={todosPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <TodoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        title={currentTodo ? 'Edit Todo' : 'Add Todo'}
        initialData={currentTodo || { title: '', completed: false }}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TodoList;