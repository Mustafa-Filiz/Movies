import SwipeableMovieCard from "@/components/SwipeableMovieCard";
import { ThemedText } from "@/components/themed-text";
import CategoryDropdown from "@/components/ui/CategoryDropdown";
import ViewComponent from "@/components/ui/ViewComponent";
import { useFavorites } from "@/hooks/useFavorites";
import { useMoviesByCategory } from "@/services/moviesApi";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [category, setCategory] = useState<string>("now_playing");
  const { data } = useMoviesByCategory(category);
  const { addToFavorites, isFavorite, loadFavorites } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  return (
    <ViewComponent>
      <View style={styles.headerRow}>
        <ThemedText type="title">Movies</ThemedText>

        <CategoryDropdown value={category} onChange={(k) => setCategory(k)} />
      </View>

      <FlatList
        data={data?.results ?? []}
        renderItem={({ item: movie }) => (
          <SwipeableMovieCard
            movie={{
              id: movie.id,
              title: movie.title,
              overview: movie.overview,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
            }}
            isFavorite={isFavorite(movie.id)}
            onAddToFavorites={addToFavorites}
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
