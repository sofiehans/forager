import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useMushroomData } from '../context/MushroomDataContext';

export default function InformationScreen() {
    const { prediction, confidence, imageUri } = useLocalSearchParams<{
        prediction?: string;
        confidence?: string;
        imageUri?: string;
    }>();

    const parsedConfidence = Number(confidence);
    const percentConf = (parsedConfidence * 100).toFixed(2);
    const router = useRouter();
    const { mushrooms } = useMushroomData();

    const mushroom = mushrooms.find(m => m.name === (prediction as string).toLowerCase());

    const backToHome = () => {
        router.push('/');
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>


                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.topRow}>
                        <Image source={{ uri: imageUri as string }} style={styles.image} />
                        <View style={styles.topRight}>
                            <Text style={styles.prediction}>Mushroom class: {prediction}</Text>
                            <Text style={styles.confidence}>Confidence: {percentConf}%</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{mushroom?.description}</Text>
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={backToHome}>
                    <Text style={styles.buttonText}>Take another photo!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D3836',
        paddingTop: 100,
        paddingHorizontal: 16,
    },
    text: {
        color: '#fff',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        left: 50,
        right: 50,
        backgroundColor: '#FF6E7B',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 4,
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        height: 600,
        backgroundColor: '#F0E3CE',
        borderRadius: 12,
        padding: 16,
        elevation: 4,
        overflow: 'hidden',
    },
    scrollContent: {
        flexGrow: 1,
    },
    topRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    topRight: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    prediction: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    confidence: {
        fontSize: 16,
        color: '#555',
    },
    description: {
        fontSize: 15,
        color: '#333',
        lineHeight: 25,
    },

});