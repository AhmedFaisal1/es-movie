// src/app/components/MovieCard.tsx
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

  return (
    <Link href={`/pages/show-movie/${id}`}>
      <div className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={`Movie poster for ${title}`}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-yellow-500">Rating: {vote_average.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
