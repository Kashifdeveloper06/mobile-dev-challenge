import { FC } from "react";
import { View, FlatList } from "react-native";

import NoodleFilters from "../components/NoodleFilters";
import NoodleCard from "../components/NoodleCard";
import useFavourites from "../hooks/useFavorites";
import { useFilter } from "../filterContext/FilterContext";
import { Stack } from "expo-router";

const FavouritesScreen: FC = () => {
  const { favourites, unmarkFavourite } = useFavourites();

  const {
    spicinessLevel,
    selectedCountry,
  } = useFilter();

  const filteredData = favourites.filter(item => {
    const matchSpiciness = !spicinessLevel || `${item.spicinessLevel}` === spicinessLevel;
    const matchCountry = !selectedCountry || item.originCountry === selectedCountry;
    return matchSpiciness && matchCountry;
  });

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Stack.Screen options={{ headerTitle: "Favourites" }} />
      <NoodleFilters />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoodleCard
            noodle={item}
            isFavourite={true}
            onRemoveFavourite={() => unmarkFavourite(item)}
          />
        )}
      />
    </View>
  );
}

export default FavouritesScreen
