'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import NavbarFooterIncluded from '../../layouts/NavbarFooterIncluded';
import Pagination from '@/app/components/Pagination';
import MovieCard from '@/app/components/MovieCard';
import TopSection from '@/app/layouts/TopSection';
import MaxWidthLayout from '@/app/layouts/MaxWidthLayout';
import { getMoviesByGenres } from '@/app/services/api';

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
};

type DiscoverMoviesResponse = {
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const SingleGenre = () => {
  const searchParams = useSearchParams();
  const genreId = searchParams.get('genreId');
  const [discoverMovies, setDiscoverMovies] = useState<DiscoverMoviesResponse | null>(null);
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const moviesPerPage = 20;
  const numberOfRecordsVisited = (selectedPage - 1) * moviesPerPage;
  const totalPagesCalculated = Math.ceil(
    (discoverMovies?.total_results ?? 0) / moviesPerPage
  );

  const handlePageChange = (providedPage: number) => {
    setSelectedPage(providedPage);
  };

  useEffect(() => {
    (async function () {
      if (genreId) {
        const genreIdNumber = parseInt(genreId, 10);
        if (!isNaN(genreIdNumber)) {
          const {
            results: discoverMoviesResults,
            total_pages,
            total_results,
          }: DiscoverMoviesResponse = await getMoviesByGenres(genreIdNumber, selectedPage);
          if (discoverMoviesResults) {
            setDiscoverMovies({
              results: discoverMoviesResults,
              total_pages,
              total_results,
            });
          }
        }
      }
    })();
  }, [genreId, selectedPage]);

  return (
    <NavbarFooterIncluded>
      <MaxWidthLayout>
        <TopSection>
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-5 md:justify-between">
            <h2 className="text-3xl uppercase font-AtypDisplayBold">
              Genrewise Results
            </h2>
          </div>

          {discoverMovies ? (
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 md:gap-10">
              {discoverMovies.results
                .slice(
                  numberOfRecordsVisited,
                  numberOfRecordsVisited + moviesPerPage
                )
                .map((singlePopularMovie: Movie) => (
                  <MovieCard
                    key={singlePopularMovie.id}
                    singlePopularMovie={singlePopularMovie}
                  />
                ))}
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <div>
            <Pagination
              totalPagesCalculated={totalPagesCalculated}
              handlePageChange={handlePageChange}
            />
          </div>
        </TopSection>
      </MaxWidthLayout>
    </NavbarFooterIncluded>
  );
};

const SingleGenreWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SingleGenre />
  </Suspense>
);

export default SingleGenreWrapper;
