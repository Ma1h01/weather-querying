import { Text, View } from "react-native";
import Searchbar from "@/components/Searchbar";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import {
  getWeatherAtUSLocation,
  getWeatherAtOtherLocation,
} from "@/services/OpenWeatherMap";
export default function Index() {
  const [searchResult, setSearchResult] = useState<
    { city: string; temperature: number; weather: string }[]
  >([]);
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

  const handleSearch = async (searchWords: any) => {
    try {
      if (searchWords.length == 2) {
        const [city, country] = searchWords;
        let res = await getWeatherAtOtherLocation(city, country);
        console.log(res.name, res.main.temp, res.weather[0].description);
        setSearchResult([{ city: res.name, temperature: res.main.temp, weather: res.weather[0].description }]);
      } else if (searchWords.length == 3) {
        const [city, state, country] = searchWords;
        let res = await getWeatherAtUSLocation(city, state, country);
        console.log(res.name, res.main.temp, res.weather[0].description);
        setSearchResult([
          {
            city: res.name,
            temperature: res.main.temp,
            weather: res.weather[0].description,
          },
        ]);
      } else {
        setSearchResult([
          {
            city: "Invalid Search Query",
            temperature: -1,
            weather: "Invalid Search Query",
          },
        ]);
      }
    } catch (error: any) {
      console.log(error);
      setSearchResult([
        {
          city: error.message,
          temperature: error.message,
          weather: error.message,
        },
      ]);
    }
  };

  return (
    <PaperProvider>
      <GestureHandlerRootView
        style={{
          flex: 2 / 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Searchbar handleSearch={handleSearch} />
        {searchResult.map((item) => (
          <View key={item.city} style={{ marginTop: 5 }}>
            <Text>{`City: ${item.city}`}</Text>
            <Text>{`Temperature: ${item.temperature}`}</Text>
            <Text>{`Weather: ${item.weather}`}</Text>
          </View>
        ))}
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
