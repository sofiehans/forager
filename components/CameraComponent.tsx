import React, { useRef, useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Alert } from 'react-native';
import { CameraView, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function CameraComponent() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const router = useRouter();

    // Check camera permissions
    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    // User has taken a photo
    const takePhoto = async () => {
        try {
            // Make sure camera is ready
            if (!isCameraReady) {
                Alert.alert('Error', 'Camera is not ready yet.');
                return;
            }

            if (cameraRef.current) {
                // Take picture
                const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync();

                // Push to next screen with the taken photo
                router.push({
                    pathname: '/IdentifyPictureScreen',
                    params: { uri: photo.uri }
                });
            } else {
                Alert.alert('Error', 'Camera reference is not available.');
            }
        } catch (error) {
            Alert.alert(
                'Error',
                `Failed to take photo: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    };

    if (!permission) return <Text>Requesting camera permission...</Text>;
    if (!permission.granted) return <Text>No access to camera</Text>;

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing="back"
                onCameraReady={() => setIsCameraReady(true)}
            />
            <View style={styles.controls}>
                <TouchableOpacity onPress={takePhoto} style={styles.shutterButton}>
                    <View style={styles.innerCircle} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 2,
        aspectRatio: 1,
        overflow: 'hidden',
    },
    controls: {
        padding: 10,
        backgroundColor: '#1D3836',
    },
    shutterButton: {
        alignSelf: 'center',
        marginTop: 15,
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 5,
        borderColor: '#F0E3CE',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        bottom: 13,
    },
    innerCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F0E3CE',
    },
});