import { FlatList } from "react-native";

import MovieCard from "@/components/movie-card";
import { ThemedText } from "@/components/themed-text";
import ViewComponent from "@/components/ui/ViewComponent";
import { useGetMovies } from "@/services/getMovies";

export default function HomeScreen() {
  const { data } = useGetMovies();
  console.log("🚀 ~ HomeScreen ~ data:", data);

  return (
    <ViewComponent>
      <ThemedText type="title">Movies</ThemedText>
      <FlatList
        data={data?.results ?? []}
        renderItem={({ item: movie }) => (
          <MovieCard
            title={movie.title}
            description={movie.overview}
            imageUrl={movie.poster_path}
            releaseDate={movie.release_date}
            rating={movie.vote_average}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </ViewComponent>
  );
}
