import React from "react";
import Link from "next/link";
import MaxWidthLayout from "./MaxWidthLayout";
import OtherSection from "./OtherSection";
import { BsStarFill } from "react-icons/bs";
import { extractImgPoster } from "../utils/extractImg";
import MovieCard from "../components/MovieCard";

// Define an interface for the movie object within MovieContainer
interface MovieContainerMovie {
  id: number;
  poster_path?: string;
  vote_average: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
}

// Define an interface for the component props
interface MovieContainerProps {
  sectionTitle: string;
  moviesList: MovieContainerMovie[]; // Use the local MovieContainerMovie interface
  btnText?: string;
  btnLink?: string;
}

const MovieContainer: React.FC<MovieContainerProps> = ({
  sectionTitle,
  moviesList = [],
  btnText,
  btnLink,
}) => {
  return (
    <MaxWidthLayout>
      <OtherSection>
        <div className="flex items-center justify-between space-x-5">
          <h2 className="text-3xl uppercase font-AtypDisplayBold">
            {sectionTitle}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 md:gap-10">
          {moviesList?.map((singlePopularMovie) => (
            <MovieCard
              singlePopularMovie={{
                ...singlePopularMovie,
                poster_path: singlePopularMovie.poster_path || "", // Ensure poster_path is not undefined
                title: singlePopularMovie.title || "", // Ensure title is not undefined
              }}
              key={singlePopularMovie.id}
            />
          ))}
        </div>
        {btnText && btnLink && (
          <div className="text-center">
            <Link href={btnLink}>
              <p className="custom-green-btn">{btnText}</p>
            </Link>
          </div>
        )}
      </OtherSection>
    </MaxWidthLayout>
  );
};

export default MovieContainer;
