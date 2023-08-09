import React from 'react';
import { Text, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const signin = () => {
        fetch('http://localhost:5000/login',{
      'methods':'POST',
      body: JSON.stringify({ "email": email, "password": password })
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error))
    }
    return(
        <>
        <View style={styles.container}> 
        <Text style={styles.text}> Email </Text>
        <TextInput  
            placeholder="Enter email"
            value={email.toLowerCase()}
            onChangeText={(text) => setEmail(text.toLowerCase())}
            style={styles.input}
            />
        <Text style={styles.text}> Password </Text>
        <TextInput 
            placeholder="Enter password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry={true}
        />

        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=>{signin()}} style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        </View>

        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      width: "80%",
    },
    text: {
        fontWeight: "300",
        fontSize: 24,
        textAlign: "left"
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "#9B6B43",
      width: "100%",
      padding: 15,
      borderRadius: 10,
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
      fontWeight: "700",
      fontSize: 16,
    },
    buttonOutlineText: {
      color: "#0782F9",
      fontWeight: "700",
      fontSize: 16,
    },
  });