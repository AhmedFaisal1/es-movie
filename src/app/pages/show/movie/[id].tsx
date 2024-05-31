import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import MaxWidthLayout from "@/app/layouts/MaxWidthLayout";
import NavbarFooterIncluded from "@/app/layouts/NavbarFooterIncluded";
import TopSection from "@/app/layouts/TopSection";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const MovieDetails: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const movieId = id.toString().split('-')[0];

      const fetchMovie = async () => {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
              api_key: '7b67e0d94c7a1d07c0312bac151d88b0',
              language: 'en-US',
            },
          });
          setMovie(response.data);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      };

      fetchMovie();
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <NavbarFooterIncluded>
      <MaxWidthLayout>
        <TopSection>
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-5 md:justify-between">
            <h2 className="text-3xl uppercase font-AtypDisplayBold">
              {movie.title}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-10">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full md:w-1/3 rounded-md"
            />
            <div className="flex flex-col space-y-4">
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Rating:</strong> {movie.vote_average}</p>
              <p><strong>Overview:</strong> {movie.overview}</p>
            </div>
          </div>
        </TopSection>
      </MaxWidthLayout>
    </NavbarFooterIncluded>
  );
};

export default MovieDetails;
