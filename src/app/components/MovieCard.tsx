import React from "react";
import { BsStarFill } from "react-icons/bs";
import { extractImgPoster } from "../utils/extractImg";
import Link from "next/link";
import { PATH } from "../constants/paths"; 

// Define an interface for the movie object
interface Movie {
  id: number;
  poster_path?: string;
  vote_average: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
}

// Define the props for the MovieCard component
interface MovieCardProps {
  singlePopularMovie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ singlePopularMovie }) => {
  return (
    <Link href={`${PATH.SHOWMOVIE}/${singlePopularMovie.id}`} passHref>
      <div className="cursor-pointer">
        <div className="space-y-5">
          <div className="relative rounded-md overflow-hidden custom-card-hover">
            {singlePopularMovie.poster_path ? (
              <img
                src={extractImgPoster(singlePopularMovie.poster_path)}
                className="rounded-md shadow-lg"
                alt={singlePopularMovie.id.toString()}
              />
            ) : (
              <div className="w-full h-[320px] bg-slate-100"></div>
            )}

            <p className="flex space-x-2 items-center absolute top-0 right-0 bg-red-500 px-1">
              <span className="text-xl text-white-500">
                <BsStarFill />
              </span>
              <span className="pt-1">{singlePopularMovie.vote_average}</span>
            </p>
          </div>
          <div className="space-y-2">
            {singlePopularMovie.title ? (
              <h3>{singlePopularMovie.title}</h3>
            ) : (
              <h3>{singlePopularMovie.name}</h3>
            )}
            {singlePopularMovie.release_date ? (
              <p className="text-gray-500">{singlePopularMovie.release_date}</p>
            ) : (
              <p className="text-gray-500">
                {singlePopularMovie.first_air_date}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
