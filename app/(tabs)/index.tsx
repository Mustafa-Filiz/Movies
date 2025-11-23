import { FlatList } from "react-native";

import MovieCard from "@/components/movie-card";
import { ThemedText } from "@/components/themed-text";
import ViewComponent from "@/components/ui/ViewComponent";
import { useNowPlayingMovies } from "@/services/moviesApi";

export default function HomeScreen() {
  const { data } = useNowPlayingMovies();

  return (
    <ViewComponent>
      <ThemedText type="title">Movies</ThemedText>
      <FlatList
        data={data?.results ?? []}
        renderItem={({ item: movie }) => (
          <MovieCard
            id={String(movie.id)}
            title={movie.title}
            description={movie.overview}
            imageUrl={movie.poster_path}
            releaseDate={movie.release_date}
            rating={movie.vote_average}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      />
    </ViewComponent>
  );
}
