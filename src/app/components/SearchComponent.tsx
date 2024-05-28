// src/components/SearchComponent.tsx

import React from 'react';
import { useSearchProvider } from '@/app/contexts/searchContext';
type Movie = {
    id: number;
    title: string;
    // Add other movie properties here
  };
  
  type SearchedMoviesResponse = {
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
const SearchComponent = () => {
  const { searchQuery, setSearchQuery } = useSearchProvider();

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchComponent;
