"use client"
import React, { useEffect, useState } from "react";
import MaxWidthLayout from "@/app/layouts/MaxWidthLayout";
import NavbarFooterIncluded from "@/app/layouts/NavbarFooterIncluded";
import TopSection from "@/app/layouts/TopSection";
import MovieCard from "@/app/components/MovieCard";
import Pagination from "@/app/components/Pagination";
import { getUpcomingMovies } from "@/app/services/api";

interface Movie {
  id: number;
  title: string;
  vote_average:number;
  poster_path:string;
}

interface UpcomingMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const Upcoming:React.FC = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMoviesResponse | null>(null);
  const [selectedPage, setSelectedPage] = useState(1);
  /**
   * For pagnination...
   */
  const [page, setPage] = useState(0);
  const moviesPerPage = 20;
  const numberOfRecordsVisited = page * moviesPerPage;
  const totalPagesCalculated = Math.ceil(
    (upcomingMovies?.total_results || 0) / moviesPerPage
  );

  const handlePageChange = (providedPage:number) => {
    setSelectedPage(providedPage);
  };

  useEffect(() => {
    (async function () {
      const {
        results: upcomingMoviesResults,
        total_pages,
        total_results,
      } = await getUpcomingMovies(selectedPage);
      upcomingMoviesResults &&
        setUpcomingMovies({
          results:upcomingMoviesResults,
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
              Upcoming Movies
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 md:gap-10">
            {upcomingMovies?.results && 
            upcomingMovies?.results
              .slice(
                numberOfRecordsVisited,
                numberOfRecordsVisited + moviesPerPage
              )
              ?.map((singlePopularMovie) => {
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
