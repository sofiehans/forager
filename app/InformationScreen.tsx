import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useMushroomData } from '../context/MushroomDataContext';

export default function InformationScreen() {
    const { prediction, confidence } = useLocalSearchParams();
    const parsedConfidence = Number(confidence);
    const percentConf = (parsedConfidence * 100).toFixed(2);
    const router = useRouter();
    const { mushrooms } = useMushroomData();
    console.log(prediction)
    const mushroom = mushrooms.find(m => m.name === (prediction as string).toLowerCase());
    console.log(mushroom?.description)

    const backToHome = () => {
        router.push('/');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Mushroom class: {prediction}</Text>
            <Text style={styles.text}>Confidence: {percentConf}%</Text>
            <Text style={styles.text}>Info: {mushroom?.description}</Text>

            <TouchableOpacity style={styles.button} onPress={backToHome}>
                <Text style={styles.buttonText}>Take another photo!</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D3836',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
    },
    text: {
        color: '#fff',
    },
    button: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 4, // adds shadow on Android
    },

    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    }
});