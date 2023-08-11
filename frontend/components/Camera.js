import { Text, TouchableOpacity, View, Modal, Image, Alert } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from "@expo/vector-icons";
import { usePitScout } from '../Stores';
import { storage } from '../firebase';
import { Button, Spinner } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';

const Camera = ({ navigation, route }) => {   
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [camera, setCamera] = useState<Camera | null>(null);
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        const response = await fetch(image);
        const blob = await response.blob();
        fetch('http://127.0.0.1:5000/camera',{
        'methods':'POST',
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error))
        Alert.alert("Successfully uploaded data");
        setImage('');
    }

    if (hasPermission === null) {
        return <Spinner />;
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
                                    >
                                        Retake Photo
                                    </Button>
                                    <Button
                                        style={{}}
                                        onPress={() => {
                                            takePicture();
                                        }}
                                    >
                                        Upload Photo
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
            </View>
        </>
    );

}
export default Camera;