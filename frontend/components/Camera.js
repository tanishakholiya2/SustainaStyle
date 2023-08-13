
import { Text, TouchableOpacity, View, Modal, Image, Alert, Button } from 'react-native';
import React, {useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';
import ImgToBase64 from 'react-native-image-base64';
import * as FS from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import IP_ADDR from '../config.js'

export default function Cam({navigation}) {
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraRollPer, setPer] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState('');
    const [label, setLabel] = useState({label: ""});

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
            setPer(permission)
            setHasPermission(status === 'granted');
        })();
    }, []);
    const takePicture = async () => {
        const response = await fetch(image);
        console.log(image);
        const blob = await response.blob();
        console.log(blob)
        // const formData = new FormData();
        // formData.append('image', blob, 'image.jpg'); // 'image.jpg' is the desired filename    
        // fetch(`http://192.168.0.88:5000/camera`,{
        // method:'POST',
        // body: formData
        // })
        await toServer({
            type: "image",
            base64: uriToBase64(image),
            uri: image
        })
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
    

    if (hasPermission === null) {
    }
    if (hasPermission === false) {
        return <Text>Please enable access to Camera</Text>;
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
                                            takePicture();
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
                        type={Camera.Constants.Type.back}
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
