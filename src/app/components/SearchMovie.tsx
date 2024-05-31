import { useState } from 'react';

const SearchMovie = () => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && query.trim() !== '') {
      window.location.href = `/searchdetail?query=${encodeURIComponent(query)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="max-w-screen-md mx-14 p-4 flex items-center">
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <div className="flex items-center border border-gray-500 rounded-md overflow-hidden">
          <input
            className="appearance-none bg-transparent border-none text-white py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-in-out"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.5 17.5l5 5"
              ></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );  
};

export default SearchMovie;