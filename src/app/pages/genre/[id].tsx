/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { getMoviesByGenres } from "@/app/services/api";
import MaxWidthLayout from "@/app/layouts/MaxWidthLayout";
import NavbarFooterIncluded from "@/app/layouts/NavbarFooterIncluded";
import TopSection from "@/app/layouts/TopSection";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const GenreMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(false);
  const router = useRouter();
  const { id, name } = router.query;

  useEffect(() => {
    if (id) {
      fetchMovies(id as string);
    }
  }, [id]);

  const fetchMovies = async (genreId: string) => {
    try {
      setLoadingMovies(true);
      const response = await getMoviesByGenres(parseInt(genreId), 1);
      setMovies(response.results);
      setLoadingMovies(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoadingMovies(false);
    }
  };

  return (
    <NavbarFooterIncluded>
      <MaxWidthLayout>
        <TopSection>
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-5 md:justify-between">
            <h2 className="text-3xl uppercase font-AtypDisplayBold">{name} Movies</h2>
          </div>
          {loadingMovies ? (
            <p className="text-white">Loading movies...</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {movies.map((movie) => (
                <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-90 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white">{movie.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TopSection>
      </MaxWidthLayout>
    </NavbarFooterIncluded>
  );
};

export default GenreMovies;
