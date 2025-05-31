import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { useQuery } from "@apollo/client";
import { Stack, useRouter } from "expo-router";

import { GET_NOODLES } from "./queries";
import { NoodleItem } from "./components/NoodleItem";
import { useFilter } from "./filterContext/FilterContext";
import NoodleFilters from "./components/NoodleFilters";
import { Noodle } from "./types";

export default function NoodleListScreen() {
  const { loading, error, data } = useQuery<{
    instantNoodles: Noodle[];
  }>(GET_NOODLES);

  const router = useRouter();
  const {
    spicinessLevel,
    selectedCountry,
  } = useFilter();

  const filteredData = data?.instantNoodles.filter(item => {
    const matchSpiciness = !spicinessLevel || `${item.spicinessLevel}` === spicinessLevel;
    const matchCountry = !selectedCountry || item.originCountry === selectedCountry;
    return matchSpiciness && matchCountry;
  });

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Noodles",
          headerRight: () => (
            <Pressable
              style={styles.favouritesButton}
              onPress={() => router.push("/favourites" as any)}>
              <Text style={styles.favouritesText}>
                {"Favourites"}
              </Text>
            </Pressable>
          ),
        }} />
      <NoodleFilters />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoodleItem {...item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", padding: 16 },
  filtersContainer: { flexDirection: "row", gap: 16, marginBottom: 10 },
  clearFilterButton: { backgroundColor: "white", borderRadius: 10 },
  favouritesText: { color: "blue", fontWeight: "600" },
  favouritesButton: { paddingRight: 10, width: 80 },
});
