import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from "react-navigation";
import { Text, Image, StyleSheet, View, TouchableOpacity, Alert} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

  export default Home = ({navigation}) => {

    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
      const temp = async () => {
        const a = await AsyncStorage.getItem("username");
        if(a){
          setLoggedIn(true);
        }
      }
      temp();
    }, [])
    return(
        <>
        <View style={styles.container}>
          <View style = {styles.outline}>
            <View style = {styles.headerGroup}>
              <Text style={styles.header}> SUSTAINA </Text>
              <Text style = {styles.text}>STYLE</Text>
            </View>
           
            <Text style={styles.text}> fashion made ethical</Text>

            <View style = {styles.imageContainer} >
              <Image style = {styles.image}  source = {require('./homePage.png')}/>
            </View>
            {loggedIn ? 
              <TouchableOpacity onPress={()=>{navigation.navigate("Cam")}} style={styles.button}>
                <Text style={styles.buttonText}>Open Camera</Text>
              </TouchableOpacity> :
              <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={()=>{navigation.navigate("Login")}} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
  
              <Text style = {styles.text}> or </Text>
  
              <TouchableOpacity onPress={()=>{navigation.navigate("Signup")}} style={styles.button}>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
              </View>
            }
          </View>
        </View>
        </>
        
        
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#EFEADE",
      paddingTop: 100,
      paddingBottom: 30,
      paddingRight: 30,
      paddingLeft: 30
    },
    outline: {
      borderWidth: 2,
      borderColor: "#9B6B43"
    },
    headerGroup: {
      paddingBottom: 20,
      paddingTop: 25
    },
    header: {
      fontWeight: "300",
      fontSize: 50,
      textAlign: "center", 
      fontFamily: 'Cochin-Bold',
      color: '#4D4738'
    },
    text: {
        fontWeight: "300",
        fontSize: 20,
        textAlign: "center", 
        fontFamily: 'Copperplate',
        color: '#4D4738'

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
        marginTop: 30,
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
    },
    buttonText: {
      fontFamily: 'Copperplate',
      color: 'white'
    },
    settings: {
      position: "absolute",
      top: 20,
      right: 20,
    },
  });