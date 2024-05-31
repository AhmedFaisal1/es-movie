'use client'
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
  const [selectedGenre, setSelectedGenre] = useState<{ id: string | null; name: string | null }>({ id: null, name: null });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        const allGenresResults = await getMovieGenres();
        console.log('Fetched genres:', allGenresResults);
        setAllGenres(allGenresResults);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    })();
  }, []);

  const fetchMovies = async (genreId: string) => {
    try {
      setLoadingMovies(true);
      const movies = await getMoviesByGenres(genreId);
      setMovies(movies);
      setLoadingMovies(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoadingMovies(false);
    }
  };

  const handleGenreClick = (genreId: number, genreName: string) => {
    setSelectedGenre({ id: genreId.toString(), name: genreName });
    fetchMovies(genreId.toString());
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
          {selectedGenre.id && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">{selectedGenre.name} Movies</h2>
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
            </div>
          )}
        </TopSection>
      </MaxWidthLayout>
    </NavbarFooterIncluded>
  );
};

export default Genre;
