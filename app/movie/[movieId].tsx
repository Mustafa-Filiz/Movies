import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import RatingPill from "@/components/ui/RatingPill";
import ViewComponent from "@/components/ui/ViewComponent";
import { IMAGE_BASE_URL, IMAGE_SIZE_W500 } from "@/constants";
import { useMovieDetail } from "@/services/moviesApi";
import { formatDate } from "@/utils/date";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const MovieDetail = () => {
  const navigation = useNavigation();
  const { movieId } = useLocalSearchParams();

  const { data, isLoading, isError } = useMovieDetail(movieId as string);

  const movie = data as any; // service types are loose; cast to any for UI usage

  useLayoutEffect(() => {
    if (data?.title) {
      navigation.setOptions({ title: data.title, headerBackTitle: "Movies" });
    } else {
      navigation.setOptions({ title: "Movie", headerBackTitle: "Movies" });
    }
  }, [navigation, data?.title]);

  const posterUri = movie?.poster_path
    ? `${IMAGE_BASE_URL}${IMAGE_SIZE_W500}${movie.poster_path}`
    : undefined;
  const backdropUri = movie?.backdrop_path
    ? `${IMAGE_BASE_URL}${IMAGE_SIZE_W500}${movie.backdrop_path}`
    : undefined;

  return (
    <ViewComponent>
      <ScrollView contentContainerStyle={styles.container}>
        {backdropUri ? (
          <Image
            source={{ uri: backdropUri }}
            style={styles.backdrop}
            contentFit="cover"
          />
        ) : (
          <View style={styles.backdropPlaceholder} />
        )}

        <ThemedView style={styles.detailCard}>
          {posterUri ? (
            <Image
              source={{ uri: posterUri }}
              style={styles.poster}
              contentFit="cover"
            />
          ) : (
            <View style={[styles.poster, styles.posterPlaceholder]} />
          )}

          <View style={styles.info}>
            <ThemedText type="title" style={styles.title}>
              {movie?.title ?? (isLoading ? "Loading..." : "Unknown title")}
            </ThemedText>

            <View style={styles.metaRow}>
              <RatingPill value={movie?.vote_average} />

              <ThemedText type="default">
                {formatDate(movie?.release_date)}
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.overviewContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Overview
          </ThemedText>

          <ThemedText>{movie?.overview ?? "No overview available."}</ThemedText>
        </ThemedView>

        {isError && (
          <ThemedText type="default" style={styles.error}>
            Failed to load movie details.
          </ThemedText>
        )}
      </ScrollView>
    </ViewComponent>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  backdrop: {
    width: "100%",
    height: 200,
  },
  backdropPlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#222",
  },
  detailCard: {
    marginTop: -60,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    elevation: 2,
  },
  poster: {
    width: 110,
    height: 165,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  posterPlaceholder: {
    backgroundColor: "#999",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 6,
  },
  error: {
    marginTop: 12,
    color: "#c00",
    marginHorizontal: 16,
  },
  overviewContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
  },
});
