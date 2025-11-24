import { ApiResponse } from "@/types/ApiResponse";
import { Movie, MovieDetail } from "@/types/Movie";
import { customFetch } from "@/utils/customFetch";
import { useQuery } from "@tanstack/react-query";

export const moviesApi = {
  getNowPlayingMovies: async () => {
    return await customFetch<ApiResponse<Movie>>("/movie/now_playing");
  },
  getPopularMovies: async () => {
    return await customFetch<ApiResponse<Movie>>("/movie/popular");
  },
  getTopRatedMovies: async () => {
    return await customFetch<ApiResponse<Movie>>("/movie/top_rated");
  },
  getUpcomingMovies: async () => {
    return await customFetch<ApiResponse<Movie>>("/movie/upcoming");
  },
  getMovieDetail: async (movieId: string) => {
    return await customFetch<MovieDetail>(`/movie/${movieId}`);
  },
};

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ["nowPlaying"],
    queryFn: moviesApi.getNowPlayingMovies,
  });
};

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: moviesApi.getPopularMovies,
  });
};

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ["movies", "top_rated"],
    queryFn: moviesApi.getTopRatedMovies,
  });
};

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: moviesApi.getUpcomingMovies,
  });
};

export const useMoviesByCategory = (category: string) => {
  const mapping: Record<string, () => Promise<any>> = {
    now_playing: moviesApi.getNowPlayingMovies,
    popular: moviesApi.getPopularMovies,
    top_rated: moviesApi.getTopRatedMovies,
    upcoming: moviesApi.getUpcomingMovies,
  };

  return useQuery({
    queryKey: ["movies", category],
    queryFn: mapping[category] ?? moviesApi.getNowPlayingMovies,
    enabled: !!category,
  });
};

export const useMovieDetail = (movieId: string) => {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => moviesApi.getMovieDetail(movieId),
    enabled: !!movieId,
  });
};
