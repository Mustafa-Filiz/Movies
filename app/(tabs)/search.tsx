import { Input } from "@/components/input";
import SwipeableMovieCard from "@/components/SwipeableMovieCard";
import { ThemedText } from "@/components/themed-text";
import ViewComponent from "@/components/ui/ViewComponent";
import { useFavourites } from "@/hooks/useFavourites";
import { useSearch } from "@/services/moviesApi";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const TabSearchScreen = () => {
  const [inputValue, setInputValue] = useState("");
  const [queryString, setQueryString] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { toggleFavourite, isFavourite, loadFavourites } = useFavourites();

  const { data, isLoading } = useSearch(queryString);
  console.log("🚀 ~ TabSearchScreen ~ data:", data);

  const onSearch = (e: string) => {
    setInputValue(e);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setQueryString(e);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ViewComponent>
          <ThemedText type="title" style={styles.title}>
            Search
          </ThemedText>

          <View style={styles.inputWrapper}>
            <Input
              placeholder="Search for movies, TV shows and people"
              value={inputValue}
              onChangeText={onSearch}
            />
          </View>

          <View>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
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
                    isFavourite={isFavourite(movie.id)}
                    toggleFavourite={toggleFavourite}
                  />
                )}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{ paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </ViewComponent>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TabSearchScreen;

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
  inputWrapper: {
    display: "flex",
  },
});
