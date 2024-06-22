export interface Movie {
  id: number;
  name?: string;
  first_air_date?: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  release_date: string;
  popularity: number;
  revenue: number;
  status: string;
  runtime: number;
  tagline: string;
}
  
export interface Cast {
  id: number;
  original_name: string;
  character: string;
  profile_path: string;
}

export interface Credits {
  cast: Cast[];
}

export interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface MovieContainerMovie extends SimilarMovie {
  vote_average: number;
}

type Genre = {
  id: number;
  name: string;
};

type GenresResponse = {
  genres: Genre[];
};
