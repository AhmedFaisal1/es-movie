'use client'
import React, { useEffect, useState } from "react";

/**
 * Components and layouts...
 */
import MaxWidthLayout from "@/app/layouts/MaxWidthLayout";
import NavbarFooterIncluded from "@/app/layouts/NavbarFooterIncluded";
import TopSection from "@/app/layouts/TopSection";
import SelectComponent from "@/app/components/SelectComponent";
import Pagination from "@/app/components/Pagination";
import MovieCard from "@/app/components/MovieCard";
import { getDiscoverMovies, getMovieGenres } from "@/app/services/api";

type Movie = {
  id: number;
  title: string;
  vote_average: number; 
  poster_path:string;
};

type Genre = {
  id: number;
  name: string;
};

type DiscoverMoviesResponse = {
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type GenresResponse = {
  genres: Genre[];
};

const Discover = () => {
  const [discoverMovies, setDiscoverMovies] = useState<DiscoverMoviesResponse | undefined>();
  const [singleGenre, setSingleGenre] = useState<number | undefined>();
  const [genres, setGenres] = useState<Genre[] | undefined>();
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [selectedPage, setSelectedPage] = useState<number>(1);

  /**
   * For pagination...
   */
  const [page, setPage] = useState<number>(0);
  const moviesPerPage = 20;
  const numberOfRecordsVisited = page * moviesPerPage;
  const totalPagesCalculated = Math.ceil(
    (discoverMovies?.total_results ?? 0) / moviesPerPage
  );

  /**
   * For select options
   */
  const selectSortOptions = [
    { value: "popularity.desc", label: "Popularity Desc" },
    { value: "popularity.asc", label: "Popularity Asc" },
    { value: "original_title.asc", label: "Title(A-Z)" },
    { value: "original_title.desc", label: "Title(Z-A)" },
    { value: "release_date.asc", label: "Release Date Asc" },
    { value: "release_date.desc", label: "Release Date Desc" },
  ];
  
  /**
   * Required functions ...
   */
  const handlePageChange = (providedPage: number) => {
    setSelectedPage(providedPage);
  };

  const handleSortByChange = (providedOpt: string) => {
    setSortBy(providedOpt);
  };

  const handleGenreChange = (providedOpt: string) => {
    // Ensure providedOpt is a number before setting the state
    const genreId = parseInt(providedOpt);
    if (!isNaN(genreId)) {
      setSingleGenre(genreId);
    }
  };
  

  useEffect(() => {
    (async function () {
      const {
        results: discoverMoviesResults,
        total_pages,
        total_results,
      }: DiscoverMoviesResponse = await getDiscoverMovies(sortBy, selectedPage, singleGenre);
      discoverMoviesResults &&
        setDiscoverMovies({
          results: discoverMoviesResults,
          total_pages,
          total_results,
        });
    })();
  }, [sortBy, selectedPage, singleGenre]);

  useEffect(() => {
    (async function () {
      const { genres: genresResults }: GenresResponse = await getMovieGenres();
      genresResults && setGenres(genresResults);
    })();
  }, []);

  return (
    <NavbarFooterIncluded>
      <MaxWidthLayout>
        <TopSection>
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-5 md:justify-between">
            <h2 className="text-3xl uppercase font-AtypDisplayBold">
              Discover Movies
            </h2>
            <div className="flex justify-center space-x-2">
              {genres && (
                <SelectComponent
                  selectOptions={genres.map((genre: Genre) => ({
                    value: genre.id.toString(),
                    label: genre.name,
                  }))}
                  handleSelectChange={handleGenreChange}
                  placeholder={"Select Genre"}
                />
              )}
              <SelectComponent
                selectOptions={selectSortOptions}
                handleSelectChange={handleSortByChange}
                placeholder={"Select Sort Opt"}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 md:gap-10">
            {discoverMovies?.results
              .slice(
                numberOfRecordsVisited,
                numberOfRecordsVisited + moviesPerPage
              )
              ?.map((singlePopularMovie: Movie) => {
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

export default Discover;
