import { Text, Button } from "react-native";

export default Volunteer = ({navigation}) => {
    return(
        <>
        <Text>This is volunteer page</Text>

        
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
        </>
    )
}