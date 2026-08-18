import FavouriteMovieItem from "@/components/FavouriteMovieItem";
import { ThemedText } from "@/components/themed-text";
import ViewComponent from "@/components/ui/ViewComponent";
import { useFavourites } from "@/hooks/useFavourites";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const TabFavouritesScreen = () => {
  const { favourites, loadFavourites } = useFavourites();

  useFocusEffect(
    useCallback(() => {
      loadFavourites();
    }, [loadFavourites]),
  );

  return (
    <ViewComponent>
      <View style={styles.headerRow}>
        <ThemedText type="title">Favourites</ThemedText>
      </View>

      {favourites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ThemedText>No favourites yet.</ThemedText>
        </View>
      ) : (
        <FlatList
          data={favourites}
          renderItem={({ item: movieId }) => (
            <FavouriteMovieItem movieId={movieId} />
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
