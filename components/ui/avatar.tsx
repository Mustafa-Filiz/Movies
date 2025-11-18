import { SharedRefType } from "expo";
import { Image, ImageSource } from "expo-image";
import React, { FC } from "react";
import { StyleSheet } from "react-native";

type Props = {
  src?:
    | ImageSource
    | string
    | number
    | ImageSource[]
    | string[]
    | SharedRefType<"image">
    | null;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Avatar: FC<Props> = ({ src }) => {
  return (
    <Image
      source={src}
      placeholder={{ blurhash }}
      style={styles.avatar}
      contentFit="cover"
      transition={1000}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
  },
});
