import { Text, Button } from "react-native";

export default Login = ({navigation}) => {
    return(
        <>
        <Text>This is login page</Text>
        <Button
          title="Go to Home"
          onPress={() =>
            navigation.navigate('Home')
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