import { Text, Button } from "react-native";

export default Leaderboard = ({navigation}) => {
    return(
        <>
        <Text> This is leaderboard page </Text>
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