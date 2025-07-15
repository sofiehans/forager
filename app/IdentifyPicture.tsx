import { useLocalSearchParams } from 'expo-router';
import { Image, View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';


export default function IdentifyPicture() {
    const { uri } = useLocalSearchParams();
    const safeUri = Array.isArray(uri) ? uri[0] : uri;
    const [pred, setPred] = useState<string | null>(null);
    const [confidence, setConfidence] = useState<number | null>(null);
    const [loading, setLoading] = useState(true); // Start as true
    const router = useRouter();


    useEffect(() => {
        const runInference = async () => {
            await sendToServer(safeUri);
        };

        runInference();
    }, []);

    useEffect(() => {
        if (pred !== null && confidence !== null) {
            console.log('Both values ready:', pred, confidence);
            router.push({
                pathname: '/InformationScreen',
                params: {
                    prediction: pred,
                    confidence: confidence.toString(),
                },
            });
        }
    }, [pred, confidence]);


    const sendToServer = async (imageUri: string) => {
        setLoading(true);
        const formData = new FormData();
        // Append to formData
        formData.append('file', {
            uri: imageUri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        } as any);

        try {
            console.log("Sending request...")
            const response = await fetch('http://192.168.2.151:5000/infer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const result = await response.json();
            // Update prediction and confidence
            setPred(result.class);
            setConfidence(result.confidence);
            setLoading(false); // Hide loader when don

        } catch (error) {
            console.error('Upload failed:', error);
        }

    };
    if (!safeUri) {
        return <Text>No image to display</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: safeUri }} style={styles.image} />

            {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Identifying object...</Text>
                </View>
            )}

        </View>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    image: {
        flex: 1,
        aspectRatio: 0.9,
        resizeMode: 'contain',
        alignSelf: 'stretch',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },

    loadingText: {
        marginTop: 16,
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    }


});