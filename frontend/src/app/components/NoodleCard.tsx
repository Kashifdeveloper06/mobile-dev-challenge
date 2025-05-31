import { View, Text, Button, Image, StyleSheet } from "react-native";
import { Noodle } from "../types";

export default function NoodleCard({
  noodle,
  isFavourite,
  onAddFavourite,
  onRemoveFavourite,
}: {
  noodle: Noodle;
  isFavourite?: boolean;
  onAddFavourite?: () => void;
  onRemoveFavourite?: () => void;
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: noodle.imageURL }} style={styles.image} />
      <Text style={styles.name}>{noodle.name}</Text>
      <Text style={styles.description}>{noodle.brand}</Text>
      <Text style={styles.description}>#{noodle.originCountry}</Text>
      <Text style={styles.description}>{"🔥".repeat(noodle.spicinessLevel)}</Text>
      {isFavourite ? (
        <Button title="Remove" onPress={onRemoveFavourite} />
      ) : (
        <Button title="Add to Favourite" onPress={onAddFavourite} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 6,
    marginBottom: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    marginTop: 4,
    fontWeight: "400",
    fontSize: 14,
  }
});
