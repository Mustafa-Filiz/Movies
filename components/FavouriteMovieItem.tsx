import { useFavourites } from "@/hooks/useFavourites";
import { useMovieDetail } from "@/services/moviesApi";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import SwipeableMovieCard from "./SwipeableMovieCard";
import { ThemedText } from "./themed-text";

interface FavouriteMovieItemProps {
  movieId: number;
}

const FavouriteMovieItem: React.FC<FavouriteMovieItemProps> = ({ movieId }) => {
  const { data: movie, isLoading, error } = useMovieDetail(String(movieId));
  const { toggleFavourite, isFavourite, loadFavourites } = useFavourites();

  if (isLoading) {
    return (
      <View
        style={{ height: 200, justifyContent: "center", alignItems: "center" }}
      >
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
    // <MovieCard
    //   id={String(movie.id)}
    //   title={movie.title}
    //   description={movie.overview}
    //   imageUrl={movie.poster_path}
    //   releaseDate={movie.release_date}
    //   rating={movie.vote_average}
    // />
    <SwipeableMovieCard
      movie={movie}
      isFavourite={isFavourite(movieId)}
      toggleFavourite={toggleFavourite}
    />
  );
};

export default FavouriteMovieItem;
