'use client'
import { useEffect, useState } from "react";
import  NavbarFooterIncluded from "@/app/layouts/NavbarFooterIncluded";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/app/services/api";
import Carousel from "@/app/components/Carousel";
import MovieContainer from "@/app/layouts/MovieContainer";

const Homepage = () => {
  const [popularMovies, setPopularMovies] = useState();
  const [topRatedMovies, setTopRatedMovies] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState();
  const [carouselMovies, setCarouselMovies] = useState();

  useEffect(() => {
    (async function () {
      const { results: populaMovieResults } = await getPopularMovies(1);
      const { results: topRatedMovieResults } = await getTopRatedMovies();
      const { results: upcomingMovieResults } = await getUpcomingMovies();

      upcomingMovieResults &&
        setCarouselMovies(upcomingMovieResults.slice(0, 5));
      upcomingMovieResults &&
        setUpcomingMovies(upcomingMovieResults.slice(0, 10));
      populaMovieResults && setPopularMovies(populaMovieResults.slice(0, 10));
      topRatedMovieResults &&
        setTopRatedMovies(topRatedMovieResults.slice(0, 10));
    })();
  }, []);

  return (
    <>
      <NavbarFooterIncluded>
        <Carousel moviesList={carouselMovies} />
        <div className="pt-10">
          <MovieContainer
            sectionTitle="Upcoming Movies"
            moviesList={upcomingMovies}
            // btnText="View All Upcoming Movies"
            // btnLink="/upcoming"
          />
          <MovieContainer
            sectionTitle="Popular Movies"
            moviesList={popularMovies}
            // btnText="View All popular Movies"
            // btnLink="/popular"
          />
          <MovieContainer
            sectionTitle="Top Rated Movies"
            moviesList={topRatedMovies}
            // btnText="View All Top Rated Movies"
            // btnLink="/top-rated"
          />
        </div>
      </NavbarFooterIncluded>
    </>
  );
};

export default Homepage;
