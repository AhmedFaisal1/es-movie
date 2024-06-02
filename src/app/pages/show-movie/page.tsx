"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ShowMovie = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  return (
    <>
      <h1>Show Movie Page</h1>
      <p>Movie slug: {slug}</p>
    </>
  );
};

const ShowMovieWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ShowMovie />
  </Suspense>
);

export default ShowMovieWrapper;
