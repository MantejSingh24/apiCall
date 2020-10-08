import React, { useState, useEffect}from "react";
//import React in our code.
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
//import all the components we are going to use.
import AsyncStorage from "@react-native-community/async-storage";

const NextScreen = () => {

      const [author, setAuthor] = useState();
    const [title, setTitle] = useState();
    const [urlToImage, setUrlToImage] = useState();
    const [description, setDescription] = useState();


  const getData = async () => {
   setAuthor(await AsyncStorage.getItem("author"));
        setTitle(await AsyncStorage.getItem("title"))
     setUrlToImage(await AsyncStorage.getItem("urlToImage"));
     setDescription(await AsyncStorage.getItem("description"))

    console.log(JSON.stringify(urlToImage))
  }
  useEffect( () => {
    getData()
  
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, margin: 10, marginBottom: 60 }}>
        <Image
          source={{ uri: urlToImage }}
          style={{ width: 250, height: 250, alignSelf: "center" }}
          resizeMode="cover"
        ></Image>
      </View>
      <View style={{ flex: 4, margin: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {author}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "justify",
            color: "red",
          }}
        >
          {title}
        </Text>
        <Text style={{ fontSize: 18, margin: 5, textAlign: "justify" }}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    padding: 16,
  }
});

export default NextScreen;
