import { ApolloProvider } from "@apollo/client";
import { Stack } from "expo-router";
import client from "@/api/client";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <Stack />
      </PaperProvider>
    </ApolloProvider>
  );
}
