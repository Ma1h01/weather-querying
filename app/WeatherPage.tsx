import { StyleSheet, Image, Text, View } from "react-native";
import Searchbar from "@/components/Searchbar";

import { useState, useEffect} from "react";
import { FlatList } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

import {
  getWeatherAtUSLocation,
  getWeatherAtOtherLocation,
} from "@/services/OpenWeatherMap";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function WeatherPage() {

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
          <View key={item.city} style={styles.container}>
            <Text style={styles.city}>{`City: ${item.city}`}</Text>
            <Text style={styles.temperature}>{`Temperature: ${item.temperature}`}</Text>
            <Text style={styles.weather}>{`Weather: ${item.weather}`}</Text>
          </View>
        ))}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',

  },
  city: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  temperature: {
    fontSize: 16,
    color: '#666',
  },
  weather: {
    fontSize: 16,
    color: '#666',
  },
});

