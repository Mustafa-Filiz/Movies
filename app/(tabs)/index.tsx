import MovieCard from "@/components/movie-card";
import { ThemedText } from "@/components/themed-text";
import CategoryDropdown from "@/components/ui/CategoryDropdown";
import ViewComponent from "@/components/ui/ViewComponent";
import { useMoviesByCategory } from "@/services/moviesApi";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [category, setCategory] = useState<string>("now_playing");

  const { data } = useMoviesByCategory(category);

  return (
    <ViewComponent>
      <View style={styles.headerRow}>
        <ThemedText type="title">Movies</ThemedText>

        <CategoryDropdown value={category} onChange={(k) => setCategory(k)} />
      </View>

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

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
