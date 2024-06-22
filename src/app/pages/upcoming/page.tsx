// src/app/pages/upcoming/page.tsx

'use client';
import React, { useEffect, useState } from "react";
import MaxWidthLayout from "@/app/layouts/MaxWidthLayout";
import NavbarFooterIncluded from "@/app/layouts/NavbarFooterIncluded";
import TopSection from "@/app/layouts/TopSection";
import Pagination from "@/app/components/Pagination";
import MovieCard from '@/app/components/MovieCard';
import { getUpcomingMovies } from "@/app/services/api";
import { Movie } from "@/app/types";  // Import the Movie type

interface UpcomingMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const Upcoming: React.FC = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMoviesResponse | null>(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const [page, setPage] = useState(0);
  const moviesPerPage = 20;
  const numberOfRecordsVisited = page * moviesPerPage;
  const totalPagesCalculated = upcomingMovies
    ? Math.ceil(upcomingMovies?.total_results / moviesPerPage)
    : 0;

  const handlePageChange = (providedPage: number) => {
    setSelectedPage(providedPage);
  };

  useEffect(() => {
    (async function () {
      const data = await getUpcomingMovies(selectedPage);
      if (data) {
        setUpcomingMovies(data);
      }
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
            {upcomingMovies?.results
              .slice(
                numberOfRecordsVisited,
                numberOfRecordsVisited + moviesPerPage
              )
              ?.map((singlePopularMovie) => (
                <MovieCard
                  key={singlePopularMovie.id}
                  singlePopularMovie={singlePopularMovie}
                />
              ))}
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
