import RatingPill from "@/components/ui/RatingPill";
import { formatDate } from "@/utils/date";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  rating: number;
  releaseDate: string;
};

const baseUrl = "https://image.tmdb.org/t/p/";
const size = "w500";
const IMAGE_BASE = `${baseUrl}${size}`;

const MovieCard: FC<Props> = ({
  id,
  title,
  imageUrl,
  description,
  rating,
  releaseDate,
}) => {
  const uri = imageUrl ? `${IMAGE_BASE}${imageUrl}` : undefined;

  return (
    <Link href={`/movie/${id}`}>
      <ThemedView style={styles.card}>
        {uri ? (
          <Image source={{ uri }} style={styles.image} contentFit="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}

        <View style={styles.content}>
          <ThemedText type="title" style={styles.title} numberOfLines={2}>
            {title}
          </ThemedText>
          <ThemedText
            type="default"
            style={styles.description}
            numberOfLines={3}
          >
            {description}
          </ThemedText>

          <View style={styles.metaRow}>
            <RatingPill value={rating} />

            <ThemedText type="default" style={styles.meta}>
              {formatDate(releaseDate)}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "flex-start",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 6,
  },
  description: {
    color: "#666",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  meta: {
    fontSize: 14,
  },
});
