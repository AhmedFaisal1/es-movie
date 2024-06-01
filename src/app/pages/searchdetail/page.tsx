/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react';

const SearchDetail = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const API_KEY = '7b67e0d94c7a1d07c0312bac151d88b0';

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('query');
    if (queryParam) {
      setQuery(queryParam);
      fetchSearchResults(queryParam);
    }
  }, []);

  const fetchSearchResults = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
<h1 className="text-3xl font-semibold mb-4">Search Results for &quot;{query}&quot;</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((movie: any) => (
          <div key={movie.id} className="bg-white rounded-md shadow-md p-4">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto mb-4" />
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-gray-600">{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDetail;
