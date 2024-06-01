/* eslint-disable @next/next/no-img-element */
import React from "react";
import MaxWidthLayout from "@/app/layouts/MaxWidthLayout";
import { truncateString } from "@/app/utils/truncateString";
import { extractImgPoster } from "@/app/utils/extractImg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PATH } from "@/app/constants/paths";
import { BsStarFill } from "react-icons/bs";
import Link from "next/link";


interface Movie {
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
  id: number;
  backdrop_path:string;
}

const CarouselItem = ({ singleMovie }: { singleMovie: Movie }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.8953956582633054) 0%, rgba(0,0,0,0.7469362745098039) 50%, rgba(0,0,0,0.9) 100%), url(https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
      className="min-h-[60vh] w-full h-full flex items-center py-28 md:py-32"
    >
      <MaxWidthLayout>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[60%_30%] md:gap-[10%]">
          {/* Poster Section */}
          <div className="flex items-center justify-center md:order-2 md:justify-end">
            <img
              src={extractImgPoster(singleMovie.poster_path)}
              alt={singleMovie.title}
              className="rounded-md shadow-lg"
            />
          </div>

          {/* Content Section */}
          <div className="self-center space-y-5 md:order-1">
            <h1 className="text-center md:text-left custom-movie-title">
              {singleMovie.title}
            </h1>
            <p className="flex items-center space-x-2">
              <span className="text-2xl text-yellow-500">
                <BsStarFill />
              </span>
              <span className="pt-1">{singleMovie.vote_average}</span>
            </p>
            <p className="leading-7 md:w-[80%] lg:w-[75%]">
              {truncateString(singleMovie.overview)}
            </p>
            <Link href={`${PATH.SHOWMOVIE}/${singleMovie.id}`} passHref>
              <p className="inline-block my-5 custom-green-btn">View Details</p>
            </Link>
          </div>
        </div>
      </MaxWidthLayout>
    </div>
  );
};

export default CarouselItem;
