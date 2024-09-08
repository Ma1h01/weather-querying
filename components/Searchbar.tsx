import React, {useState} from 'react'
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Searchbar = ({ handleSearch }: { handleSearch: any}) => {
  const [searchText, setSearchText] = useState("");
  return (
    <View style={styles.container}>    
      <View style={styles.searchField}>
        <TextInput
          style={styles.input}
          placeholder="Weather in ... city"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          clearButtonMode="always"
          onSubmitEditing={() => handleSearch(searchText)}
        />
      </View>
      <Pressable onPress={() => handleSearch(searchText)}>
        <Ionicons
          name="search"
          size={24}
          color="black"
          style={styles.icon}
        />
        </Pressable>        
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",                
        alignItems: "center",
        justifyContent: "center",
    },
  searchField: {    
    width: "80%",
    margin: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  input: {
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    // marginRight: 10,
  },
});


export default Searchbar