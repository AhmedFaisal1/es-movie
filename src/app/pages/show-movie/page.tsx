'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';

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

export default ShowMovie;
