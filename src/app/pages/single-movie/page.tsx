/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSingleMovie,
  getSingleMovieCredits,
  getSimilarMovies,
} from "@/app/services/api";
import { truncateString } from "@/app/utils/truncateString";
import { extractImgPoster } from "@/app/utils/extractImg";
import { BsStarFill } from "react-icons/bs";
import NavbarFooterIncluded from "@/app/layouts/NavbarFooterIncluded";
import MaxWidthLayout from "@/app/layouts/MaxWidthLayout";
import TopSection from "@/app/layouts/TopSection";
import OtherSection from "@/app/layouts/OtherSection";
import MovieContainer from "@/app/layouts/MovieContainer";

// Define types for your data
interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  genres: { id: number; name: string }[];
  release_date: string;
  popularity: number;
  revenue: number;
  status: string;
  runtime: number;
  tagline: string;
}

interface Cast {
  id: number;
  original_name: string;
  character: string;
  profile_path: string;
}

interface Credits {
  cast: Cast[];
}

interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average:number;
}

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const fetchMovieData = async (movieId:string, endpoint:string) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/${endpoint}?api_key=${API_KEY}&language=en-US`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

const SingleMovie: React.FC = () => {
  const [singleMovie, setSingleMovie] = useState<Movie | null>(null);
  const [singleMovieCredits, setSingleMovieCredits] = useState<Credits | null>(null);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[] | null>(null);
  const { movieId } = useParams<{ movieId: string }>();

  useEffect(() => {
    (async function () {
      if (movieId) {
        const id = parseInt(movieId, 10);
        const result = await getSingleMovie(id);
        const creditResult = await getSingleMovieCredits(id);
        const { results: similarMoviesResult } = await getSimilarMovies(id);
        result && setSingleMovie(result);
        creditResult && setSingleMovieCredits(creditResult);
        similarMoviesResult && setSimilarMovies(similarMoviesResult.slice(0, 10));
      }
    })();
  }, [movieId]);

  if (!singleMovie) return null;

  return (
    <NavbarFooterIncluded>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.8953956582633054) 0%, rgba(0,0,0,0.7469362745098039) 50%, rgba(0,0,0,0.9) 100%), url(https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
        className="min-h-[60vh] w-full flex items-center py-28 md:py-36 space-y-10"
      >
        <MaxWidthLayout>
          <div className="grid grid-cols-1 md:grid-cols-[28%_70%] gap-[2%]">
            {/* Poster Section */}
            <div className="flex items-center justify-center md:justify-start">
              <img
                src={extractImgPoster(singleMovie.poster_path)}
                alt={singleMovie.title}
                className="rounded-md shadow-lg"
              />
            </div>

            {/* Content Section */}
            <div className="self-center space-y-5">
              <h1 className="text-center md:text-left custom-movie-title">
                {singleMovie.title}
              </h1>
              <p className="flex items-center space-x-2">
                <span className="text-2xl text-yellow-500">
                  <BsStarFill />
                </span>
                <span className="pt-1">{singleMovie.vote_average}</span>
              </p>
              <p className="leading-7">
                {truncateString(singleMovie.overview)}
              </p>
              {/* <button className="custom-green-btn">View Details</button> */}
            </div>
          </div>
        </MaxWidthLayout>
      </div>

      <TopSection>
        <MaxWidthLayout>
          <div className="grid grid-cols-1 md:grid-cols-[76%_20%] gap-[4%]">
            {/* Left section */}
            <div className="space-y-8">
              <h2 className="custom-section-title">All Casts</h2>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
                {singleMovieCredits?.cast.slice(0, 16).map((singleCast) => {
                  return (
                    <div key={singleCast.id} className="space-y-2">
                      <div className="max-h-[320px] overflow-hidden rounded-md">
                        {singleCast.profile_path ? (
                          <img
                            src={extractImgPoster(singleCast.profile_path)}
                            className="object-cover w-full h-full rounded-md"
                          />
                        ) : (
                          <div className="h-[320px] rounded-md bg-gray-100"></div>
                        )}
                      </div>
                      <h2>{singleCast.original_name}</h2>
                      <p>{singleCast.character}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Right Section */}
            <div className="space-y-8">
              {/* Genres */}
              <div className="space-y-2">
                <h2 className="custom-minor-title">Genres</h2>
                <div className="flex flex-row flex-wrap">
                  {singleMovie.genres.map((singleGenre) => {
                    return (
                      <p
                        key={singleGenre.id}
                        className="px-5 py-2 mx-1 my-1 border border-gray-500 rounded-md"
                      >
                        {singleGenre.name}
                      </p>
                    );
                  })}
                </div>
              </div>
              {/* Release Date */}
              <div className="space-y-2">
                <h2 className="custom-minor-title">Release Date</h2>
                <p>{singleMovie.release_date}</p>
              </div>
              <div className="space-y-2">
                <h2 className="custom-minor-title">Rating</h2>
                <p>{singleMovie.vote_average}</p>
              </div>
              <div className="space-y-2">
                <h2 className="custom-minor-title">Popularity</h2>
                <p>{singleMovie.popularity}</p>
              </div>
              <div className="space-y-2">
                <h2 className="custom-minor-title">Revenue</h2>
                <p>{singleMovie.revenue}</p>
              </div>
              <div className="space-y-2">
                <h2 className="custom-minor-title">Status</h2>
                <p>{singleMovie.status}</p>
              </div>
              <div className="space-y-2">
                <h2 className="custom-minor-title">Runtime</h2>
                <p>{singleMovie.runtime}</p>
              </div>
              <div className="space-y-2">
                <h2 className="custom-minor-title">Tagline</h2>
                <p>{singleMovie.tagline}</p>
              </div>
            </div>
          </div>
        </MaxWidthLayout>
      </TopSection>
      <OtherSection>
        {similarMovies && (
          <MovieContainer
            sectionTitle="Similar Movies"
            moviesList={similarMovies}
          />
        )}
      </OtherSection>
    </NavbarFooterIncluded>
  );
};

export default SingleMovie;
