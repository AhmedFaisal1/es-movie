'use client';
import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import SingleMovie from '../../single-movie/page';

const ShowMovie = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <>
      <SingleMovie params={{ id }} />
    </>
  );
};

const ShowMovieWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ShowMovie />
  </Suspense>
);

export default ShowMovieWrapper;
