import { Image, Text, View } from "react-native";
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
    <GestureHandlerRootView>
      <Image
        source={{ uri: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDNyN2t6bTNjMjFrOTA4MmJocDNycDR2Zjd2MGN0M2sxam4yZXlvYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tHbrvPFQw7x3BFioxA/giphy.webp" }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Searchbar handleSearch={handleSearch} />
        {searchResult.map((item) => (
          <View key={item.city} style={{ marginTop: 5 }}>
            <Text>{`City: ${item.city}`}</Text>
            <Text>{`Temperature: ${item.temperature}`}</Text>
            <Text>{`Weather: ${item.weather}`}</Text>
          </View>
        ))}
      </View>
    </GestureHandlerRootView>
  );
}
