import axios from 'axios';

const tmdbUrl = "https://api.themoviedb.org/3";
const tmdbKey = '7b67e0d94c7a1d07c0312bac151d88b0'

const axiosClient = axios.create({ baseURL: tmdbUrl });

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    // Axios error with response
    return error.response.data;
  } else if (error instanceof Error) {
    // General error
    return error.message;
  }
  return 'An unknown error occurred';
};

/**
 * Getting the popular movies...
 */
export const getPopularMovies = async (page: number) => {
  const response = await axios.get(`${tmdbUrl}/movie/popular`, {
    params: {
      api_key: tmdbKey,
      page,
    },
  });
  return response.data;
};


/**
 * Getting the MovieDetails...
 */
export const getMovieDetails = async (movieId: string) => {
  const response = await axios.get(`${tmdbUrl}/movie/${movieId}`, {
    params: {
      api_key: tmdbKey,
      language: 'en-US',
    },
  });
  return response.data;
};
/**
 * Getting the top rated movies...
 */
export const getTopRatedMovies = async (selectedPage: number = 1) => {
  try {
    const { data } = await axiosClient({
      method: "get",
      url: "/movie/top_rated",
      params: {
        api_key: tmdbKey,
        language: "en-US",
        page: selectedPage,
      },
    });
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Getting the upcoming movies...
 */
export const getUpcomingMovies = async (selectedPage: number = 1) => {
  try {
    const { data } = await axiosClient({
      method: "get",
      url: "/movie/upcoming",
      params: {
        api_key: tmdbKey,
        language: "en-US",
        page: selectedPage,
      },
    });
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Getting the trending movies...
 */
export const getTrendingMovies = async (category: string = "movie", dayWeek: string = "day", page: number = 1) => {
  try {
    const { data } = await axiosClient({
      method: "get",
      url: `/trending/${category}/${dayWeek}`,
      params: {
        api_key: tmdbKey,
        page: page,
      },
    });
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Getting the discover movies...
 */
export const getDiscoverMovies = async (sortBy: string, selectedPage: number, singleGenre: number = 28) => {
  try {
    const { data } = await axiosClient({
      method: "get",
      url: "/discover/movie",
      params: {
        api_key: tmdbKey,
        sort_by: sortBy || "popularity.desc",
        page: selectedPage,
        with_genres: singleGenre,
      },
    });
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Getting the genres list...
 */
export const getMovieGenres = async () => {
  const response = await axios.get(`${tmdbUrl}/genre/movie/list`, {
    params: {
      api_key: tmdbKey,
    },
  });
  return response.data.genres;
};

/**
 * Getting the people list...
 */
export const getPeople = async (selectedPage: number) => {
  try {
    const { data } = await axiosClient({
      method: "get",
      url: "/person/popular",
      params: {
        api_key: tmdbKey,
        page: selectedPage,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Getting the single movie data...
 */
export const getSingleMovie = async (movieId: number) => {
  try {
    const { data } = await axiosClient({
      method: "get",
      url: `/movie/${movieId}`,
      params: {
        api_key: tmdbKey,
        language: "en-US",
      },
    });
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Getting the single movie credits...
 */
export const getSingleMovieCredits = async (movieId: number) => {
  try {
    const { data } = await axiosClient({
      method: "get",
      url: `/movie/${movieId}/credits`,
      params: {
        api_key: tmdbKey,
        language: "en-US",
      },
    });
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Getting the similar movies...
 */
export const getSimilarMovies = async (movieId: number) => {
  try {
    const { data } = await axiosClient({
      method: "get",
      url: `/movie/${movieId}/similar`,
      params: {
        api_key: tmdbKey,
        language: "en-US",
      },
    });
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Getting the movies on the basis of genres...
 */
export const getMoviesByGenres = async (genreId:number, selectedPage = 1) => {
  try {
    const { data } = await axiosClient({
      method: "get",
      url: `/discover/movie`,
      params: {
        api_key: tmdbKey,
        language: "en-US",
        with_genres: genreId,
        page: selectedPage,
      },
    });
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Search movie by title...
 */
export const getSearchedMovie = async (movieTitle: string, selectedPage: number = 1) => {
  try {
    const { data } = await axiosClient({
      method: "get",
      url: `/search/movie`,
      params: {
        query: movieTitle,
        api_key: tmdbKey,
        language: "en-US",
        page: selectedPage,
      },
    });
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
