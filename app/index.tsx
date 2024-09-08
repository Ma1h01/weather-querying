import { Text, View } from "react-native";
import Searchbar from "@/components/Searchbar";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function Index() {
  const [searchResult, setSearchResult] = useState<{ city: string; temperature: number; weather: string; }[]>([]);
  const weather = [
    {
      city: "Atlanta",
      temperature: 25,
      weather: "Sunny",
    },
    {
      city: "London",
      temperature: 15,
      weather: "Rainy",
    },
    {
      city: "Atlanta",
      temperature: 30,
      weather: "Cloudy",
    },
  ];

  const handleSearch = (city: string) => {
    const result: any = weather.filter((item) => item.city === city);
    setSearchResult(result);
  }

  return (
    <GestureHandlerRootView
      style={{
        flex: 2 / 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Searchbar handleSearch={handleSearch} />
      {searchResult.map((item) => (
        <View key={item.city} style={{marginTop: 5}}>
          <Text>{`City: ${item.city}`}</Text>
          <Text>{`Temperature: ${item.temperature}`}</Text>
          <Text>{`Weather: ${item.weather}`}</Text>
        </View>
      ))}
    </GestureHandlerRootView>
  );
}
