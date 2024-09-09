import { Image, Text, View } from "react-native";
import Searchbar from "@/components/Searchbar";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";


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
          <View key={item.city} style={{marginTop: 5 }}>
            <Text style={{ color: 'white' }}>{`City: ${item.city}`}</Text>
            <Text style={{ color: 'white' }}>{`Temperature: ${item.temperature}`}</Text>
            <Text style={{ color: 'white' }}>{`Weather: ${item.weather}`}</Text>
          </View>
        ))}
      </View>
    </GestureHandlerRootView>
  );
}
