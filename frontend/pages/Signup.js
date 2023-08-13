import React from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import IP_ADDR from '../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = () => {
      fetch(`http://${IP_ADDR}/signup`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },  
        body: JSON.stringify({"username": email, "password": password})
      })
      .then(response => {
        console.log(response); // Log the response object
        AsyncStorage.setItem("username", response.username);
        return response.json();
      })
      .then(navigation.navigate('FindAlt'))
      .catch(error => console.log(error));
    }

    return(
      <>
      <View style={styles.container}> 
      <View style = {styles.outline}>
      <View style = {styles.textContainer}>
      <View style = {styles.headerGroup}>
            <Text style={styles.header}>SIGNUP</Text>
          </View>
      <Text style={styles.text}> email </Text>
      <TextInput  
          placeholder="Enter email"
          value={email.toLowerCase()}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          style={styles.input}
          />
      <Text style={styles.text}> password </Text>
      <TextInput 
          placeholder="Enter password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
      />

      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={()=>{createUser()}} style={styles.button}>
          <Text style={styles.buttonText}>create account</Text>
      </TouchableOpacity>
      </View>
      </View>
      
      </View>
      </View>
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#EFEADE",
    paddingTop: 100,
    paddingBottom: 30,
    paddingRight: 30,
    paddingLeft: 30
  },
  header: {
    fontWeight: "500",
    fontSize: 50,
    textAlign: "center", 
    fontFamily: 'Cochin-Bold',
    color: '#4D4738',
    paddingBottom: 50
  },
  textContainer: {
    paddingTop: 40,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center'
  },
  outline: {
    borderWidth: 2,
    borderColor: "#9B6B43",
    paddingBottom: 150
  },
  input: {
    backgroundColor: "#9B6B43",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 40,
    marginTop: 5,
    width: "80%",
    paddingBottom: 10,
  },
  text: {
      fontWeight: "300",
      fontSize: 24,
      textAlign: "left",
      paddingBottom: 15,
      color: "#4D4738",
      paddingTop: 10,
      fontFamily: 'Copperplate',
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#4D4738",
    width: "100%",
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#172c42",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "300",
    fontSize: 16,
    fontFamily: 'Copperplate',
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});