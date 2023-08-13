
import { Text, StyleSheet, TouchableOpacity, View, Modal, Image, Alert, Button, ActivityIndicator } from 'react-native';
import React, {useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';
import ImgToBase64 from 'react-native-image-base64';
import * as FS from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import IP_ADDR from '../config.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Cam({navigation}) {

    const [type, setType] = useState(CameraType.back);
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraRollPer, setPer] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState('');
    const [label, setLabel] = useState({label: ""});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
            setPer(permission)
            setHasPermission(status === 'granted');
        })();
    }, []);
    const takePicture = async () => {
        // const formData = new FormData();
        // formData.append('image', blob, 'image.jpg'); // 'image.jpg' is the desired filename    
        // fetch(`http://192.168.0.88:5000/camera`,{
        // method:'POST',
        // body: formData
        // })
        await postImage();
        // await toServer({
        //     type: "image",
        //     base64: uriToBase64(image),
        //     uri: image
        // })
    }
    const pickMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          base64: true,
        });
        if (result.cancelled) {
          return;
        }
        if (result.type == "image") {
          await toServer({
            type: result.type,
            base64: result.base64,
            uri: result.uri,
          });
        } else {
          let base64 = await uriToBase64(result.uri);
          await toServer({
            type: result.type,
            base64: base64,
            uri: result.uri,
          })
        }
      };    
      const uriToBase64 = async (uri) => {
        let base64 = await FS.readAsStringAsync(uri, {
          encoding: FS.EncodingType.Base64,
        });
        return base64;
      };
    

    toServer = async (mediaFile) => {
        let schema = "http://";
        let host = "192.168.2.64";
        let route = "/results";
        let port = "5000";
        let url = "";
        let content_type = "image/jpeg";
        url = schema + host + ":" + port + route;

        let response = await FS.uploadAsync(url, mediaFile.uri, {
            headers: {
            "content-type": content_type,
            },
            httpMethod: "POST",
            uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
        }).then(Alert.alert("Successfully uploaded!")).then(response => console.log(response)).then(navigation.navigate('StoreOptions'));
        };
        const blobToBase64 = (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
            resolve(reader.result);
            };
        });
    };

    async function postImage() {
        let based = "";
        const response = await fetch(image);
        const blobbed = await response.blob();
        await blobToBase64(blobbed).then(async (res) =>{
            based = res;
        });
        const username = await AsyncStorage.getItem('username');
        await axios.post(`http://${IP_ADDR}/results`, 
            {
                username: username,
                img: based
            }
        )
        .then(function (response) {
            navigation.navigate('StoreOptions', { responseData: response.data[0]});
        })
        .catch(function (error) {
            alert(error)
            console.log(error)
        });
    }
    
    if (hasPermission === null) {
    }
    if (hasPermission === false) {
        return <Text>Please enable access to Camera</Text>;
    }

    if(loading){
        return (
            <View style = {styles.outline}>
              <View style = {styles.headerGroup}>
                <Text style={styles.header}>RESULTS</Text>
              </View>

              <View style = {styles.optionsContainer}>
                <Text style = {styles.text}>{"loading results"}</Text>
                <ActivityIndicator size="large" />
              </View>
            </View>
        )
    }
    if (image.length > 0) {
        return (
            <>
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        flex: 1,
                    }}
                >
                    <Image source={{ uri: image }} style={{ flex: 1 }} />
                    <View>
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={true}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    marginBottom: 5,
                                }}>
                                    <Button
                                        style={{marginRight: 4}}
                                        onPress={() => {
                                            setImage('');
                                        }}

                                        title = "Retake Photo"
                                    >
                                    </Button>
                                    <Button
                                        style={{}}
                                        onPress={() => {
                                            setLoading(true);
                                            postImage();
                                        }}

                                        title = "Upload Photo"
                                    >
                                    </Button>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </>
        );
    }

    return (
        <>
            <Toast position="top" topOffset={40}/>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}
                >
                    <Camera
                        ref={ref => setCamera(ref)}
                        style={{ flex: 1 }}
                        type={type}
                        ratio={'1:1'}
                    />
                </View>
                <View style={{flex: 'col'}}>
                <TouchableOpacity
                    onPress={async () => {
                        if (camera) {
                            const data = await camera.takePictureAsync({ base64: true });
                            setImage(data.uri);
                        }
                    }}
                >
                    <Ionicons
                        name='ellipse'
                        size={64}
                        color="black"
                        style={{
                            alignSelf: 'center',
                        }}
                    />
                </TouchableOpacity>
                {cameraRollPer ? (
                <Button
                    title="Pick From Gallery"
                    onPress={async () => {
                    await pickMedia();
                    }}
                />
                ) : (
                <Text>Camera Roll Permission Required ! </Text>
                )}
                </View>
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    itemImage: {
      width: 50,
      height: 50,
      borderColor: 'black',
      borderWidth: 1,
    },
    itemContainer: {
        paddingBottom: 5
    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        justifyContent: "space-evenly",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        shadowOpacity: 0.3,
        backgroundColor: "#9B6B43",
        borderRadius: 40,
        alignItems: "center",
        borderColor: '#4D4738',
        borderWidth: 2
    },
    optionsContainer: {
        flexDirection: 'column',
        paddingTop: 20
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
      paddingBottom: 5,
      paddingTop: 25
    },
    header: {
      fontWeight: "300",
      fontSize: 65,
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
        marginTop: 5,
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