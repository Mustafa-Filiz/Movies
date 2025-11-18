import { ThemedText } from "@/components/themed-text";
import Avatar from "@/components/ui/avatar";
import ViewComponent from "@/components/ui/ViewComponent";
import React from "react";
import { StyleSheet } from "react-native";

const TabProfileScreen = () => {
  return (
    <ViewComponent>
      <Avatar src={require("@/assets/images/react-logo.png")} />
      <ThemedText type="title">Profile Screen</ThemedText>
    </ViewComponent>
  );
};

export default TabProfileScreen;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
