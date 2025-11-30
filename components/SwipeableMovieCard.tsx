import MovieCard from "@/components/movie-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Movie } from "@/hooks/useFavorites";
import React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface SwipeableMovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onAddToFavorites: (movieId: number) => void;
}

const SwipeableMovieCard: React.FC<SwipeableMovieCardProps> = ({
  movie,
  isFavorite,
  onAddToFavorites,
}) => {
  const renderRightActions = (
    progress: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const style = useAnimatedStyle(() => {
      const scale = interpolate(
        drag.value,
        [-80, 0],
        [1, 0],
        Extrapolation.CLAMP
      );
      return {
        transform: [{ scale }],
      };
    });

    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => {
          onAddToFavorites(movie.id);
        }}
      >
        <Reanimated.View style={[styles.actionIcon, style]}>
          <IconSymbol
            size={30}
            name={isFavorite ? "heart.fill" : "heart"}
            color="white"
          />
        </Reanimated.View>
      </RectButton>
    );
  };

  return (
    <ReanimatedSwipeable
      renderRightActions={renderRightActions}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
    >
      <MovieCard
        id={String(movie.id)}
        title={movie.title}
        description={movie.overview}
        imageUrl={movie.poster_path}
        releaseDate={movie.release_date}
        rating={movie.vote_average}
      />
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 16,
    borderRadius: 12,
  },
  actionIcon: {
    width: 80,
    alignItems: "center",
  },
});

export default SwipeableMovieCard;
