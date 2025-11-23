import { ApiResponse } from "@/types/ApiResponse";
import { Movie, MovieDetail } from "@/types/Movie";
import { customFetch } from "@/utils/customFetch";
import { useQuery } from "@tanstack/react-query";

export const moviesApi = {
  getNowPlayingMovies: async () => {
    return await customFetch<ApiResponse<Movie>>("/movie/now_playing");
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

export const useMovieDetail = (movieId: string) => {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => moviesApi.getMovieDetail(movieId),
    enabled: !!movieId,
  });
};
