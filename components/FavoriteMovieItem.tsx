import MovieCard from "@/components/movie-card";
import { useMovieDetail } from "@/services/moviesApi";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemedText } from "./themed-text";

interface FavoriteMovieItemProps {
  movieId: number;
}

const FavoriteMovieItem: React.FC<FavoriteMovieItemProps> = ({ movieId }) => {
  const { data: movie, isLoading, error } = useMovieDetail(String(movieId));

  if (isLoading) {
    return (
      <View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={{ padding: 16 }}>
        <ThemedText>Failed to load movie.</ThemedText>
      </View>
    );
  }

  return (
    <MovieCard
      id={String(movie.id)}
      title={movie.title}
      description={movie.overview}
      imageUrl={movie.poster_path}
      releaseDate={movie.release_date}
      rating={movie.vote_average}
    />
  );
};

export default FavoriteMovieItem;
