import React, { useEffect, useState } from "react";

/**
 * Components and layouts...
 */
import  MaxWidthLayout from "@/app/layouts/MaxWidthLayout";
import   NavbarFooterIncluded   from "@/app/layouts/NavbarFooterIncluded";
import  TopSection  from "@/app/layouts/TopSection";
import  Pagination  from "@/app/components/Pagination";
import MovieCard from '@/app/components/MovieCard'
import  {getPopularMovies } from "@/app/services/api";

interface Movie {
  id: number;
  poster_path?: string;
  vote_average: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
}

interface PopularMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const Upcoming: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<PopularMoviesResponse | null>(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const [page, setPage] = useState(0);
  const moviesPerPage = 20;
  const numberOfRecordsVisited = page * moviesPerPage;
  const totalPagesCalculated = Math.ceil(
    (popularMovies?.total_results || 0) / moviesPerPage
  );

  const handlePageChange = (providedPage: number) => {
    setSelectedPage(providedPage);
  };

  useEffect(() => {
    (async function () {
      const {
        results: popularMoviesResults,
        total_pages,
        total_results,
      } = await getPopularMovies(selectedPage);
      popularMoviesResults &&
        setPopularMovies({
          results: popularMoviesResults,
          total_pages,
          total_results,
        });
    })();
  }, [selectedPage]);

  return (
    <NavbarFooterIncluded>
      <MaxWidthLayout>
        <TopSection>
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-5 md:justify-between">
            <h2 className="text-3xl uppercase font-AtypDisplayBold">
              Popular Movies
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 md:gap-10">
            {popularMovies?.results
              .slice(
                numberOfRecordsVisited,
                numberOfRecordsVisited + moviesPerPage
              )
              ?.map((singlePopularMovie:any) => {
                return (
                  <MovieCard
                    key={singlePopularMovie.id}
                    singlePopularMovie={singlePopularMovie}
                  />
                );
              })}
          </div>
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

export default Upcoming;
