import { ApiResponse } from "@/types/ApiResponse";
import { Movie } from "@/types/Movie";
import { customFetch } from "@/utils/customFetch";
import { useQuery } from "@tanstack/react-query";

export const moviesApi = {
  getNowPlayingMovies: async () => {
    return await customFetch<ApiResponse<Movie>>("/movie/now_playing");
  },
  getMovieDetail: async (movieId: string) => {
    return await customFetch<ApiResponse<Movie>>(`/movie/${movieId}`);
  },
};

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ["nowPlaying"],
    queryFn: moviesApi.getNowPlayingMovies,
  });
};
