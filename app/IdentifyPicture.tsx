import { useLocalSearchParams } from 'expo-router';
import { Image, View, StyleSheet, Text } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';

export default function IdentifyPicture() {
    const { uri } = useLocalSearchParams();
    const safeUri = Array.isArray(uri) ? uri[0] : uri;
    const [pred, setPred] = useState<string | null>(null);
    const [confidence, setConfidence] = useState<string | null>(null);

    useEffect(() => {
        const runInference = async () => {
            await sendToServer(safeUri);
        };

        runInference();
    }, []);

    const sendToServer = async (imageUri: string) => {
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
            console.log('Server response:', result);

            // Update prediction and confidence
            setPred(result.class);
            setConfidence(result.confidence);

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

});