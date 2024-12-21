import React from 'react';

const Pagination = ({ totalTodos, todosPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalTodos / todosPerPage);

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 border rounded text-sm sm:text-base ${
            currentPage === i + 1
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-gray-300 text-gray-700 border-gray-400 hover:bg-gray-400'
          }`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
