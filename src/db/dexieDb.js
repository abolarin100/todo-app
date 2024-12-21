import Dexie from 'dexie';

export const db = new Dexie('TodoAppDB');


db.version(1).stores({
  todos: 'id, title, completed', 
});


export const addTodoToDB = async (todo) => db.todos.put(todo);
export const getTodosFromDB = async () => db.todos.toArray();
export const updateTodoInDB = async (id, updatedTodo) =>
  db.todos.update(id, updatedTodo);
export const deleteTodoFromDB = async (id) => db.todos.delete(id);
