import axios from 'axios';
import {
  addTodoToDB,
  getTodosFromDB,
  updateTodoInDB,
  deleteTodoFromDB,
} from '../db/dexieDb';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    const todos = response.data; 
    todos.forEach((todo) => addTodoToDB(todo)); 
    return todos;
  } catch (error) {
    console.error('API fetch failed, loading from Dexie...', error);
    return await getTodosFromDB(); 
  }
};

export const addTodo = async (newTodo) => {
  try {
    const response = await axios.post(API_URL, newTodo);
    const createdTodo = response.data;
    await addTodoToDB(createdTodo); // Persist to Dexie
    return createdTodo;
  } catch {
    const fallbackTodo = { ...newTodo, id: Date.now() };
    await addTodoToDB(fallbackTodo); // Offline mode
    return fallbackTodo;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
    await updateTodoInDB(id, response.data); // Sync to Dexie
    return response.data;
  } catch {
    await updateTodoInDB(id, updatedTodo); // Offline update
    return updatedTodo;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    await deleteTodoFromDB(id); // Sync to Dexie
    return true;
  } catch {
    await deleteTodoFromDB(id); // Offline delete
    return true;
  }
};
