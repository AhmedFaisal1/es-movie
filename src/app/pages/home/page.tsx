'use client';

import React, { useState, useEffect } from 'react';
import NavbarFooterIncluded from '../../layouts/NavbarFooterIncluded';
import MovieContainer from '../../layouts/MovieContainer';
import Carousel from "../../components/Carousel";

interface HomepageClientProps {
  popularMovies: Array<any>;
  topRatedMovies: Array<any>;
  upcomingMovies: Array<any>;
}

const HomepageClient: React.FC<HomepageClientProps> = ({ popularMovies, topRatedMovies, upcomingMovies }) => {
  const [carouselMovies, setCarouselMovies] = useState<Array<any>>([]);

  useEffect(() => {
    if (upcomingMovies && upcomingMovies.length > 0) {
      setCarouselMovies(upcomingMovies.slice(0, 5));
    }
  }, [upcomingMovies]);

  return (
    <NavbarFooterIncluded>
      <Carousel moviesList={carouselMovies} />
      <div className="pt-10">
        <MovieContainer
          sectionTitle="Upcoming Movies"
          moviesList={upcomingMovies}
          btnText="View All Upcoming Movies"
          btnLink="/upcoming"
        />
        <MovieContainer
          sectionTitle="Popular Movies"
          moviesList={popularMovies}
          btnText="View All Popular Movies"
          btnLink="/popular"
        />
        <MovieContainer
          sectionTitle="Top Rated Movies"
          moviesList={topRatedMovies}
          btnText="View All Top Rated Movies"
          btnLink="/top-rated"
        />
      </div>
    </NavbarFooterIncluded>
  );
};

export default HomepageClient;
