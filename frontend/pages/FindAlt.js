import { Text, Button } from "react-native";

export default  FindAlt = ({navigation}) => {
    return(
        <>
            <Text> This is finding alternative style page </Text>
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
          title="Go to Volunteer"
          onPress={() =>
            navigation.navigate('Volunteer')
          }
          />
        </>
    )
}