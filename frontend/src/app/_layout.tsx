import { ApolloProvider } from "@apollo/client";
import { Stack } from "expo-router";
import client from "@/api/client";
import { PaperProvider } from "react-native-paper";

import { FilterProvider } from './filterContext/FilterContext';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <FilterProvider>
        <PaperProvider>
          <Stack />
        </PaperProvider>
      </FilterProvider>
    </ApolloProvider>
  );
}
