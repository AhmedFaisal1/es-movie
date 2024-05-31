'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchedKey: string;
  updateSearchedKey: (key: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedKey, setSearchedKey] = useState('');

  const updateSearchedKey = (key: string) => {
    setSearchedKey(key);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchedKey, updateSearchedKey }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchProvider = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchProvider must be used within a SearchProvider');
  }
  return context;
};
