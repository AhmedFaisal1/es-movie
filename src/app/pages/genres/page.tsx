'use client';
import React, { useEffect, useState } from "react";
import MaxWidthLayout from '@/app/layouts/MaxWidthLayout';
import NavbarFooterIncluded from '@/app/layouts/NavbarFooterIncluded';
import TopSection from '@/app/layouts/TopSection';
import { getMovieGenres } from "@/app/services/api";
import Link from "next/link";

type Genre = {
  id: number;
  name: string;
};

const Genre = () => {
  const [allGenres, setAllGenres] = useState<Genre[] | undefined>(undefined);

  useEffect(() => {
    (async function () {
      try {
        const allGenresResults = await getMovieGenres();
        if (Array.isArray(allGenresResults)) {
          setAllGenres(allGenresResults);
        } else {
          console.error("Unexpected response structure:", allGenresResults);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    })();
  }, []);

  return (
    <NavbarFooterIncluded>
      <MaxWidthLayout>
        <TopSection>
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-5 md:justify-between">
            <h2 className="text-3xl uppercase font-AtypDisplayBold">
              Available Genres
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {allGenres?.map((singleGenre) => (
              <Link key={singleGenre.id} href={`/pages/show-genre?genreId=${singleGenre.id}`}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2953956582633054) 0%, rgba(0,0,0,0.2469362745098039) 50%, rgba(0,0,0,0.6) 100%), url(/assets/images/genres/${singleGenre.name}.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                  }}
                  className="text-center px-[10px] py-[80px] rounded-md cursor-pointer custom-card-hover"
                >
                  <h2 className="custom-minor-title">{singleGenre.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </TopSection>
      </MaxWidthLayout>
    </NavbarFooterIncluded>
  );
};

export default Genre;
