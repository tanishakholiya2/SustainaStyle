import { Text, Image, StyleSheet, View, TouchableOpacity} from "react-native";

export default  FindAlt = ({navigation}) => {
    return(
        <>
          <View style={styles.container}>
            <Text style={styles.text}>fashion made ethical</Text>
            <View style = {styles.outline}>
              <View style = {styles.headerGroup}>
                <Text style={styles.header}>FIND</Text>
                <Text style = {styles.text}>YOUR ALTERNATIVE</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Cam")}}>
                  <Text style={styles.buttonText}>take picture of clothing</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style = {styles.navigationContainer}>
            <View style = {styles.navButtonHolder}>
                <TouchableOpacity style = {styles.navigationButton} onPress={()=>{navigation.navigate("FindAlt")}}>
                  <Image style = {styles.navImage} source = {require('./camera.png')}/>
                </TouchableOpacity>
              </View>
              
              <View style = {styles.navButtonHolder}>
              <TouchableOpacity style = {styles.navigationButton} onPress={()=>{navigation.navigate("Leaderboard")}}>
              <Image style = {styles.navImage} source = {require('./leaderboard.png')}/>
              </TouchableOpacity>
              </View>

              <View style = {styles.navButtonHolder}>
              <TouchableOpacity style = {styles.navigationButton} onPress={()=>{navigation.navigate("Volunteer")}}>
              <Image style = {styles.navImage} source = {require('./volunteer.png')}/>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
    )
}

const styles = StyleSheet.create({
  navigationContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20
  },
  navButtonHolder: {
    padding: 5
  },
  navigationButton: {
    backgroundColor: '#4D4738',
    borderColor: '#9B6B43',
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    borderRadius: 22,
    alignSelf: "flex-start",
  },
  navImage: {
    width: 25,
    height: 25,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#EFEADE",
    paddingTop: 100,
    paddingBottom: 50,
    paddingRight: 30,
    paddingLeft: 30
  },
  outline: {
    borderWidth: 2,
    borderColor: "#9B6B43",
    alignContent: "center",
    paddingBottom: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerGroup: {
    paddingBottom: 20,
    paddingTop: 25
  },
  header: {
    fontWeight: "300",
    fontSize: 70,
    textAlign: "center", 
    fontFamily: 'Cochin-Bold',
    color: '#4D4738'
  },
  text: {
      fontWeight: "200",
      fontSize: 28,
      textAlign: "center", 
      fontFamily: 'Copperplate',
      color: '#4D4738',
      paddingBottom: 10
  },
  imageContainer: {
    aspectRatio: 1,
    paddingTop: 30,
    paddingLeft: 0,
    paddingRight: 0,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  buttonContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
      paddingBottom: 10,
      gap: 10
  },
  button: {
    padding: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    backgroundColor: "#9B6B43",
    borderRadius: 40,
    alignItems: "center",
    borderColor: '#4D4738',
    borderWidth: 2
  },
  buttonText: {
    fontFamily: 'Copperplate',
    color: 'white',
    fontWeight: "100"
  },
  settings: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});