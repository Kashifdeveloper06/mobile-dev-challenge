import React, { useState } from "react";
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
import MenuPicker from "./components/MenuPicker";
import { Button } from "react-native-paper";

export default function NoodleListScreen() {
  const { loading, error, data } = useQuery<{
    instantNoodles: {
      id: string; name: string;
      spicinessLevel: string;
      originCountry: string;
    }[];
  }>(GET_NOODLES);

  const [spicinessLevel, setSpicinessLevel] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const filteredData = data?.instantNoodles.filter(item => {
    const matchSpiciness = !spicinessLevel || `${item.spicinessLevel}` === spicinessLevel;
    const matchCountry = !selectedCountry || item.originCountry === selectedCountry;
    return matchSpiciness && matchCountry;
  });

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  const renderFilters = () => {
    return (
      <View style={styles.filtersContainer}>
        <View style={{ flex: 1 }}>
          <MenuPicker
            value={spicinessLevel}
            placeHolder={"Spiciness Level"}
            onSelect={(value) => setSpicinessLevel(value)}
            data={[
              { label: 'Level 1', value: 1 },
              { label: 'Level 2', value: 2 },
              { label: 'Level 3', value: 3 },
              { label: 'Level 4', value: 4 },
              { label: 'Level 5', value: 5 },
            ]}
          />
        </View>
        <View style={{ flex: 1 }}>
          <MenuPicker
            value={selectedCountry}
            placeHolder={"Origin Country"}
            onSelect={(value) => setSelectedCountry(value)}
            data={[
              { label: 'South Korea', value: 'south_korea' },
              { label: 'Indonesia', value: 'indonesia' },
              { label: 'Malaysia', value: 'malaysia' },
              { label: 'Thailand', value: 'thailand' },
              { label: 'Japan', value: 'japan' },
              { label: 'Singapore', value: 'singapore' },
              { label: 'Vietnam', value: 'vietnam' },
              { label: 'China', value: 'china' },
              { label: 'Taiwan', value: 'taiwan' },
              { label: 'Philippines', value: 'philippines' },
            ]}
          />
        </View>
      </View>
    )
  }

  const renderResetFilter = () => {
    if (spicinessLevel || selectedCountry) {
      return (
        <Button
          style={styles.clearFilterButton}
          onPress={() => {
            setSpicinessLevel(null)
            setSelectedCountry(null)
          }}>
          {"Clear Filter"}
        </Button>
      )
    } else return null
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Noodles" }} />
      {renderFilters()}
      {renderResetFilter()}
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
