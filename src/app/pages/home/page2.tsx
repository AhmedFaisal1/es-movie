import React from 'react';
import { SearchProvider } from '@/app/contexts/searchContext';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/app/services/api";
import HomepageClient from './page';

export const revalidate = 60; // Optional: Revalidate at most once every 60 seconds

const Homepage = async () => {
  try {
    const popularMovies = await getPopularMovies();
    const topRatedMovies = await getTopRatedMovies();
    const upcomingMovies = await getUpcomingMovies();

    const popularMoviesList = popularMovies?.results?.slice(0, 10) || [];
    const topRatedMoviesList = topRatedMovies?.results?.slice(0, 10) || [];
    const upcomingMoviesList = upcomingMovies?.results?.slice(0, 10) || [];

    return (
      <SearchProvider>
        <HomepageClient
          popularMovies={popularMoviesList}
          topRatedMovies={topRatedMoviesList}
          upcomingMovies={upcomingMoviesList}
        />
      </SearchProvider>
    );
  } catch (error) {
    console.error("Failed to load movies:", error);
    return (
      <div>
        <h1>Error loading movies</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
};

export default Homepage;
