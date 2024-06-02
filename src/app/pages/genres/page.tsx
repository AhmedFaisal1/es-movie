/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { getMovieGenres, getMoviesByGenres } from "@/app/services/api";
import MaxWidthLayout from "@/app/layouts/MaxWidthLayout";
import NavbarFooterIncluded from "@/app/layouts/NavbarFooterIncluded";
import TopSection from "@/app/layouts/TopSection";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Genre = () => {
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<{ id: number | null; name: string | null }>({ id: null, name: null });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const allGenresResults = await getMovieGenres();
        console.log('Fetched genres:', allGenresResults);
        setAllGenres(allGenresResults);
      } catch (error) {
        console.error('Error fetching genres:', error);
        setError('Failed to load genres.');
      }
    })();
  }, []);

  const fetchMovies = async (genreId: number, page: number = 1) => {
    try {
      setLoadingMovies(true);
      setError(null);
      console.log(`Fetching movies for genre ID: ${genreId}, Page: ${page}`);
      const response = await getMoviesByGenres(genreId, page);
      console.log('Fetched movies response:', response);
      if (response && response.results) {
        setMovies(response.results);
        console.log('Movies set in state:', response.results);
      } else {
        setMovies([]);
        console.log('No movies found for this genre.');
      }
      setLoadingMovies(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to load movies.');
      setLoadingMovies(false);
    }
  };

  const handleGenreClick = (genreId: number, genreName: string) => {
    console.log(`Genre clicked: ${genreName} (ID: ${genreId})`);
    setSelectedGenre({ id: genreId, name: genreName });
    fetchMovies(genreId);
  };

  return (
    <NavbarFooterIncluded>
      <MaxWidthLayout>
        <TopSection>
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-5 md:justify-between">
            <h2 className="text-3xl uppercase font-AtypDisplayBold">Available Genres</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {allGenres.map((singleGenre: Genre) => (
              <div
                key={singleGenre.id}
                onClick={() => handleGenreClick(singleGenre.id, singleGenre.name)}
                className="cursor-pointer"
              >
                <div
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2953956582633054) 0%, rgba(0,0,0,0.2469362745098039) 50%, rgba(0,0,0,0.6) 100%), url(/assets/images/genres/${singleGenre.name}.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                  }}
                  className="text-center px-[10px] py-[80px] rounded-md cursor-pointer custom-card-hover"
                >
                  <h2 className="custom-minor-title">{singleGenre.name}</h2>
                </div>
              </div>
            ))}
          </div>
          {selectedGenre.id !== null && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">{selectedGenre.name} Movies</h2>
              {loadingMovies ? (
                <p className="text-white">Loading movies...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {movies.length > 0 ? (
                    movies.map((movie) => (
                      <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-90 object-cover" />
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-white">{movie.title}</h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">No movies found for this genre.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </TopSection>
      </MaxWidthLayout>
    </NavbarFooterIncluded>
  );
};

export default Genre;
