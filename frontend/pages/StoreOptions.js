import { Text, Image, StyleSheet, FlatList, View, Linker, TouchableOpacity, Alert} from "react-native";
import { useState, useEffect } from "react";
import IP_ADDR from "../config.js";

export default  StoreOptions = ({route, navigation}) => {

  const responseData = route.params.responseData;
  const label = responseData.label;
  const results = responseData.results
  Alert.alert(JSON.stringify(responseData));

    return(
        <>
          <View style={styles.container}>
            <Text style={styles.text}>fashion made ethical</Text>
            <View style = {styles.outline}>
              <View style = {styles.headerGroup}>
                <Text style={styles.header}>RESULTS</Text>
              </View>

              <View style = {styles.optionsContainer}>
                <Text style = {styles.text}>{label.length == 0 ? "loading results": "found: " + label}</Text>

                {!!(label.length !== 0) && <FlatList data = {results}
                    renderItem={({item}) => <StoreOption name= {item.name} link = {item.link} />}
                //     renderItem={({item}) => <View style = {styles.itemContainer}><TouchableOpacity style = {styles.item} onPress = {()=> Linker.openURL(item.link)}>
                //   {//  <Image style = {styles.itemImage} source = {require('./sample.png')}/> 
                //   }
                //     <Text style = {styles.buttonText}>{item.name}</Text>
                // </TouchableOpacity></View>}
                    />}
              </View>
            </View>

            <View style = {styles.navigationContainer}>
            <View style = {styles.navButtonHolder}>
                <TouchableOpacity style = {styles.navigationButton} onPress={()=>{navigation.navigate("FindAlt")}}>
                  <Image style = {styles.navImage} source = {require('./camera.png')}/>
                </TouchableOpacity>
              </View>
              
              <View style = {styles.navButtonHolder}>
              <TouchableOpacity style = {styles.navigationButton} onPress={()=>{navigation.navigate("Leaderboard")}}>
              <Image style = {styles.navImage} source = {require('./leaderboard.png')}/>
              </TouchableOpacity>
              </View>

              <View style = {styles.navButtonHolder}>
              <TouchableOpacity style = {styles.navigationButton} onPress={()=>{navigation.navigate("Volunteer")}}>
              <Image style = {styles.navImage} source = {require('./volunteer.png')}/>
              </TouchableOpacity>
              </View>

           
            </View>
          </View>
        </>
    )
}

const StoreOption = ({name, link}) => (
  <View  style = {{paddingBottom: 5}}>
  {<TouchableOpacity style = {styles.item} onPress= {()=> Linking.openURL("https://" + link)}><Text style = {styles.itemText}>{name}</Text></TouchableOpacity>}
  </View>

)

const styles = StyleSheet.create({
    itemImage: {
      width: 50,
      height: 50,
      borderColor: 'black',
      borderWidth: 1,
    },
    itemContainer: {
        paddingBottom: 5
    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        justifyContent: "space-evenly",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        shadowOpacity: 0.3,
        backgroundColor: "#9B6B43",
        borderRadius: 40,
        alignItems: "center",
        borderColor: '#4D4738',
        borderWidth: 2
    },
    optionsContainer: {
        flexDirection: 'column',
        paddingTop: 20
    },
    navigationContainer: {
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: 20
    },
    navButtonHolder: {
      padding: 5
    },
    navigationButton: {
      backgroundColor: '#4D4738',
      borderColor: '#9B6B43',
      borderWidth: 2,
      paddingHorizontal: 15,
      paddingVertical: 15,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      shadowOpacity: 0.3,
      borderRadius: 22,
      alignSelf: "flex-start",
    },
    navImage: {
      width: 25,
      height: 25,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#EFEADE",
      paddingTop: 100,
      paddingBottom: 50,
      paddingRight: 30,
      paddingLeft: 30
    },
    outline: {
      borderWidth: 2,
      borderColor: "#9B6B43",
      alignContent: "center",
      paddingBottom: 50,
      flex: 1,
      alignItems: "center",
      paddingTop: 10
    },
    headerGroup: {
      paddingBottom: 5,
      paddingTop: 25
    },
    header: {
      fontWeight: "300",
      fontSize: 65,
      textAlign: "center", 
      fontFamily: 'Cochin-Bold',
      color: '#4D4738'
    },
    text: {
        fontWeight: "200",
        fontSize: 28,
        textAlign: "center", 
        fontFamily: 'Copperplate',
        color: '#4D4738',
        paddingBottom: 10
    },
    imageContainer: {
      aspectRatio: 1,
      paddingTop: 30,
      paddingLeft: 0,
      paddingRight: 0,
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        paddingBottom: 10,
        gap: 10
    },
    button: {
      padding: 15,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      shadowOpacity: 0.3,
      backgroundColor: "#9B6B43",
      borderRadius: 40,
      alignItems: "center",
      borderColor: '#4D4738',
      borderWidth: 2
    },
    buttonText: {
      fontFamily: 'Copperplate',
      color: 'white',
      fontWeight: "100"
    },
    settings: {
      position: "absolute",
      top: 20,
      right: 20,
    },
  });