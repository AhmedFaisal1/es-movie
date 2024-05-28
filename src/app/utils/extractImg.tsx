export const extractImgPoster = (providedPath: string): string => {
  let imgSrc;
  return (imgSrc = `https://image.tmdb.org/t/p/w300/${providedPath}`);
};
