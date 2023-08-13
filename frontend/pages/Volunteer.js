import { Text, TextInput, Switch,Image, FlatList, StyleSheet, View, Linking, TouchableOpacity} from "react-native";
import { useState, useEffect } from "react";
import IP_ADDR from "../config.js";


const VolunteerOption = ({name, link, showOption}) => (
  <View  style = {{paddingBottom: 5}}>
  {!!showOption && <TouchableOpacity style = {styles.item} onPress= {()=> Linking.openURL("https://" + link)}><Text style = {styles.itemText}>{name}</Text></TouchableOpacity>}
  </View>

)

export default Volunteer = ({navigation}) => {
  useEffect(()=>{
    fetch('http://'+IP_ADDR+'/volunteer',{
      'methods':'GET',
    })
    .then(response => response.json())
    .then(response => setVolunteer(response))
    .catch(error => console.log(error))
  },[])
  const [volunteer, setVolunteer] = useState([])
  const [isEnabled, setIsEnabled] = useState(false);
  console.log(volunteer)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <>
       <View style={styles.container}>
            <Text style={styles.text}>fashion made ethical</Text>
            <View style = {styles.outline}>
              <View style = {styles.headerGroup}>
                <Text style={styles.header}>VOLUNTEER</Text>
                <Text style = {styles.text}>OPPORTUNITIES</Text>
              </View>

              <View style = {styles.inputContainer}>
                <View style = {styles.inputRow}>
                  <Text style = {styles.text}>online: </Text>
                  <Switch  
                    trackColor={{false: '#767577', true: '#9B6B43'}}
                    thumbColor={isEnabled ? 'black' : '#EFEADE'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>

              <FlatList 
                    data = {volunteer}
                    renderItem={({item}) => <VolunteerOption name= {item.name} link = {item.link} showOption={isEnabled ? item.online == 'yes' : item.online == 'no' || item.online == 'yes'}/>}
                    />
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
  itemContainer: {
    paddingBottom: 5
},
itemText: {
  fontFamily: 'Copperplate',
    color: 'white',
    fontWeight: "200",
    fontSize: 20
},
item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    justifyContent: "space-evenly",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.3,
    backgroundColor: "#9B6B43",
    borderRadius: 5,
    alignItems: "center",
    borderColor: '#4D4738',
    borderWidth: 2,
    width: 250,
    height: 38,
    paddingBottom: 5
},
optionsContainer: {
    flexDirection: 'column',
    paddingTop: 20
},
  inputContainer: {
    paddingBottom: 20
  },
  inputRow: {
    flexDirection: 'row',
    flexWrap : 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5
  },
  input: {
    backgroundColor: "#EFEADE",
    borderColor: "#4D4738",
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 40,
    marginTop: 5,
    width: "50%",
    paddingBottom: 10,
  },
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
    paddingTop: 10
  },
  headerGroup: {
    paddingBottom: 20,
    paddingTop: 25
  },
  header: {
    fontWeight: "300",
    fontSize: 45,
    textAlign: "center", 
    fontFamily: 'Cochin-Bold',
    color: '#4D4738'
  },
  text: {
      fontWeight: "200",
      fontSize: 25,
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
    backgroundColor: "#4D4738",
    borderRadius: 5,
    borderColor: "#9B6B43",
    borderWidth: 2,
    alignItems: "center",
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