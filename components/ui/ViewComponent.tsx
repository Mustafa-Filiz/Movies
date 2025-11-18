import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "../themed-view";

type Props = {
  children: React.ReactNode;
};

const ViewComponent: FC<Props> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView>{children}</ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ViewComponent;

const styles = StyleSheet.create({});
