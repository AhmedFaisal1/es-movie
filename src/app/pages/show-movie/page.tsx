import React from "react";
import { useRouter } from "next/router";

const ShowMovie = () => {
  const router = useRouter();

  // You can access route parameters using useRouter hook
  const { slug } = router.query;

  return (
    <>
      <h1>Show Movie Page</h1>
      <p>Movie slug: {slug}</p>
    </>
  );
};

export default ShowMovie;
