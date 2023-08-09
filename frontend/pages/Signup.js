import { Text, Button } from "react-native";

export default Signup = ({navigation}) => {
    return(
        <>
        <Text>This is sign-up page</Text>
        <Button
          title="Go to Home"
          onPress={() =>
            navigation.navigate('Home')
          }
          />
         
          <Button
          title="Go to Login"
          onPress={() =>
            navigation.navigate('Login')
          }
          />

          <Button
          title="Go to Leaderboard"
          onPress={() =>
            navigation.navigate('Leaderboard')
          }
          />

          <Button
          title="Go to FindAlt"
          onPress={() =>
            navigation.navigate('FindAlt')
          }
          />

          <Button
          title="Go to Volunteer"
          onPress={() =>
            navigation.navigate('Volunteer')
          }/>
        </>
    )
}