import React, {useState} from 'react'
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HelperText, Tooltip } from 'react-native-paper';

const Searchbar = ({ handleSearch }: { handleSearch: any}) => {
  const [searchText, setSearchText] = useState("");
  const [helperTextVisible, setHelperTextVisible] = useState(false);

  const handleTextChange = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      setHelperTextVisible(true);
    } else {
      setHelperTextVisible(false);
    }
  };

  const handleSumit = () => {
    handleSearch(searchText);
    setHelperTextVisible(false);
  }
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.searchField}>
          <TextInput
            style={styles.input}
            placeholder="Weather in ... city"
            value={searchText}
            onChangeText={handleTextChange}
            clearButtonMode="always"
            onSubmitEditing={handleSumit}
          />
        </View>
        <Pressable onPress={handleSumit}>
          <Ionicons name="search" size={24} color="black" style={styles.icon} />
        </Pressable>
      </View>
      <HelperText
        type="info"
        visible={helperTextVisible}
        style={styles.helperText}
      >
        Enter in the form of City, State(Only US), Country
      </HelperText>
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
    marginLeft: 10,
    marginRight: 10,
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
  helperText: {
    marginLeft: 20,    
  }
});


export default Searchbar