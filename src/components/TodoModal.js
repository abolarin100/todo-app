import React from 'react';

const TodoModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  title = 'Add Todo',
  initialData = { title: '', completed: false },
  isLoading = false 
}) => {
  const [todoTitle, setTodoTitle] = React.useState(initialData.title);
  const [completed, setCompleted] = React.useState(initialData.completed);

  React.useEffect(() => {
    setTodoTitle(initialData.title);
    setCompleted(initialData.completed);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title: todoTitle, completed });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl w-11/12 max-w-lg mx-auto">
        <h2 className="text-lg md:text-xl font-bold mb-4 text-center">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            placeholder="Enter todo title"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => setCompleted(!completed)}
              className="h-4 w-4"
            />
            <span className="text-sm md:text-base">Completed</span>
          </label>
          <div className="flex flex-col md:flex-row justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              disabled={isLoading}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
