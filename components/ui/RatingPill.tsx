import { ThemedText } from "@/components/themed-text";
import { formatRating, ratingColor } from "@/utils/rating";
import React, { FC } from "react";
import { StyleProp, StyleSheet, View, type ViewStyle } from "react-native";

type Props = {
  value?: number | null;
  style?: StyleProp<ViewStyle>;
};

const RatingPill: FC<Props> = ({ value, style }) => {
  if (value === undefined || value === null) return null;

  const bg = ratingColor(value);

  return (
    <View style={[styles.pill, { backgroundColor: bg }, style]}>
      <ThemedText type="defaultSemiBold" style={styles.text}>
        {formatRating(value)}
      </ThemedText>
    </View>
  );
};

export default RatingPill;

const styles = StyleSheet.create({
  pill: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    minWidth: 42,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});
