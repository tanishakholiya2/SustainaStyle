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
import History from './pages/History';
import StoreOptions from './pages/StoreOptions';
import Camera from './components/Camera';
import { NativeBaseProvider, Box } from "native-base";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <NavigationContainer >
        <Stack.Navigator style = {styles.container} initialRouteName="Home">
          <Stack.Screen style = {styles.container}
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FindAlt"
            component={FindAlt}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options = {{headerShown: false}}
          />
          <Stack.Screen
            name="Leaderboard"
            component={Leaderboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Volunteer"
            component={Volunteer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="History"
            component={History}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="StoreOptions"
            component={StoreOptions}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name = "Cam"
            component = {Camera}
            options = {{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEADE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
