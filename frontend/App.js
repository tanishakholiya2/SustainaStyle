import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FindAlt from './pages/FindAlt';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Volunteer from './pages/Volunteer';

const Stack = createNativeStackNavigator();

export default function App() {
  // useEffect(()=>{
  //   fetch('http://localhost:5000/',{
  //     'methods':'GET',
  //   })
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(error => console.log(error))
  // },[])

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="FindAlt"
            component={FindAlt}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            name="Leaderboard"
            component={Leaderboard}
          />
          <Stack.Screen
            name="Volunteer"
            component={Volunteer}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
