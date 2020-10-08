import React, { useState, useEffect } from "react";
//import React in our code.
import  AsyncStorage  from "@react-native-community/async-storage";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,Image
} from "react-native";
//import all the components we are going to use.
import axios from "react-native-axios";

const HomeScreen = ({navigation}) => {
    const [data, setData] = useState();
  useEffect(() => {
    apiCall();
  }, []);
  const apiCall = async () => {
    try {
    await axios
      .get(
        "https://newsapi.org/v1/articles?source=the-verge&apiKey=379e1c906a314eb7bd9d9316a9f6368b"
      )
      .then(function (response) {
        
        var array =[]
        for ( var i = 0; i <= 9; i++ ){
          const values = response.data.articles[ i ];
          array.push(values)
          
        }
        console.log( array )
        setData(array)
      })
      .catch(function (error) {
        console.log(error);
      });
    
    } catch (error) {
      // handle error
      alert(error.message);
    }
  };

  return (
    <View style={styles.MainContainer}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => (
          <TouchableOpacity onPress={()=>{ AsyncStorage.setItem("title", item.item["title"]),
            AsyncStorage.setItem("author", item.item["author"]),
            AsyncStorage.setItem("urlToImage", item.item["urlToImage"]),
            AsyncStorage.setItem( "description", item.item[ "description" ] );
            navigation.navigate("NextScreen")
          } }>
            <View style={styles.listItem}>
              <View style={{ flex: 2 }}>
                <Image
                  source={{ uri: item.item["urlToImage"] }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
              </View>
              <View style={{ alignItems: "center", flex: 4 }}>
                <Text>{item.item["author"]}</Text>

                <Text style={{ color: "green" }}>{item.item["title"]}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};


export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    marginTop: 60,
  },
  listItem: {
    flex:1,
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
});