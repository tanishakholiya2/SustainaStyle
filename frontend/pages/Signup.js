import React from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';


export default function SignUp({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const createUser = () => {
    fetch('http://localhost:5000/signup',{
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
            />

            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>{createUser()}} style={styles.button}>
                <Text style={styles.buttonText}>Signup</Text>
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
      alignContent: "center",
      justifyContent: "center",
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
      justifyContent: "center"
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