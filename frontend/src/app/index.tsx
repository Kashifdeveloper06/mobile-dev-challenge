import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import { useQuery } from "@apollo/client";
import { Stack } from "expo-router";

import { GET_NOODLES } from "./queries";
import { NoodleItem } from "./components/NoodleItem";
import { useFilter } from "./filterContext/FilterContext";
import NoodleFilters from "./components/NoodleFilters";

export default function NoodleListScreen() {
  const { loading, error, data } = useQuery<{
    instantNoodles: {
      id: string; name: string;
      spicinessLevel: string;
      originCountry: string;
    }[];
  }>(GET_NOODLES);

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
      <Stack.Screen options={{ headerTitle: "Noodles" }} />
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
  clearFilterButton: { backgroundColor: "white", borderRadius: 10 }
});
