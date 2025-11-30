import FavoriteMovieItem from "@/components/FavoriteMovieItem";
import { ThemedText } from "@/components/themed-text";
import ViewComponent from "@/components/ui/ViewComponent";
import { useFavorites } from "@/hooks/useFavorites";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const TabFavouritesScreen = () => {
  const { favorites, loadFavorites } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  return (
    <ViewComponent>
      <View style={styles.headerRow}>
        <ThemedText type="title">Favourites</ThemedText>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ThemedText>No favorites yet.</ThemedText>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item: movieId }) => (
            <FavoriteMovieItem movieId={movieId} />
          )}
          keyExtractor={(item) => String(item)}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ViewComponent>
  );
};

export default TabFavouritesScreen;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
