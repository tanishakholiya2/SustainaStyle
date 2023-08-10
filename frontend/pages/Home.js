import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from "react-navigation";
  import { Text, Button, StyleSheet, View, TouchableOpacity} from "react-native";

  export default Home = ({navigation}) => {

    return(
        <>
        <View style={styles.container}>
          <View style = {styles.outline}>
            <Text style={styles.text}> Sustainastyle </Text>
            <Text style={styles.text}> Fashion made ethical</Text>

            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>{navigation.navigate("Login")}} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate("Signup")}} style={styles.button}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate("Leaderboard")}} style={styles.button}>
              <Text style={styles.buttonText}>Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate("FindAlt")}} style={styles.button}>
              <Text style={styles.buttonText}>Find Alternative Clothing</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate("Volunteer")}} style={styles.button}>
              <Text style={styles.buttonText}>Volunteer</Text>
            </TouchableOpacity>
            </View>
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
      paddingTop: 60,
      paddingBottom: 30,
      paddingRight: 30,
      paddingLeft: 30
    },
    outline: {
      padding: 60,
      borderWidth: 4,
      borderColor: "#9B6B43"
    },
    text: {
        fontWeight: "300",
        fontSize: 24,
        textAlign: "center", 
 
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        gap: 30
    },
    button: {
      padding: 15,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      shadowOpacity: 0.3,
      backgroundColor: "#9B6B43",
      borderRadius: 40,
      alignItems: "center"
    },
    settings: {
      position: "absolute",
      top: 20,
      right: 20,
    },
  });