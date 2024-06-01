/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieCardProps {
  singlePopularMovie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ singlePopularMovie }) => {
  const { id, title, poster_path, vote_average } = singlePopularMovie;

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <Link href={`/show/movie/${id}-${slug}`}>
      <div className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-white">Rating: {vote_average}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
