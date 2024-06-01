'use client'
import React, { useEffect, useState } from "react";
import MaxWidthLayout from "@/app/layouts/MaxWidthLayout";
import NavbarFooterIncluded from "@/app/layouts/NavbarFooterIncluded";
import TopSection from "@/app/layouts/TopSection";
import { getTrendingMovies } from "@/app/services/api";
import SelectComponent from "@/app/components/SelectComponent";
import Pagination from "@/app/components/Pagination";
import MovieCard from "@/app/components/MovieCard";

interface Movie {
  id: number;
  title: string;
  vote_average:number;
  poster_path:string;
}

interface TrendingMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const Trending: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<TrendingMoviesResponse | null>(null);
  const [category, setCategory] = useState<string>("movie");
  const [dayWeek, setDayWeek] = useState<string>("day");
  const [selectedPage, setSelectedPage] = useState<number>(1);

  /**
   * For pagination...
   */
  const [page, setPage] = useState<number>(0);
  const moviesPerPage = 20;
  const numberOfRecordsVisited = page * moviesPerPage;
  const totalPagesCalculated = Math.ceil(
    (trendingMovies?.total_results || 0) / moviesPerPage
  );

  /**
   * For select options
   */
  const selectCategoryOptions = [
    { value: "movie", label: "Movie" },
    { value: "tv", label: "TV" },
  ];
  const selectDayWeekOptions = [
    {
      value: "day",
      label: "Day",
    },
    {
      value: "week",
      label: "Week",
    },
  ];

  const handleCategoryChange = (providedCategory: string) => {
    setCategory(providedCategory);
  };
  const handleDayWeekChange = (providedDayWeek: string) => {
    setDayWeek(providedDayWeek);
  };
  const handlePageChange = (providedPage: number) => {
    setSelectedPage(providedPage);
  };

  useEffect(() => {
    (async function () {
      const {
        results: trendingMoviesResults,
        total_pages,
        total_results,
      } = await getTrendingMovies(category, dayWeek, selectedPage);
      setTrendingMovies({
        results: trendingMoviesResults,
        total_pages,
        total_results,
      });
    })();
  }, [category, dayWeek, selectedPage]);

  return (
    <NavbarFooterIncluded>
      <MaxWidthLayout>
        <TopSection>
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-5 md:justify-between">
            <h2 className="text-3xl uppercase font-AtypDisplayBold">
              Trending Movies
            </h2>
            <div className="flex justify-center space-x-2">
              <SelectComponent
                selectOptions={selectCategoryOptions}
                handleSelectChange={handleCategoryChange}
                placeholder={"Select Category"}
              />
              <SelectComponent
                selectOptions={selectDayWeekOptions}
                handleSelectChange={handleDayWeekChange}
                placeholder={"Select Day/Week"}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 md:gap-10">
            {trendingMovies?.results&&
            trendingMovies.results
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

export default Trending;
