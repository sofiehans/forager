import { useLocalSearchParams } from 'expo-router';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');


export default function IdentifyPicture() {
    const { uri } = useLocalSearchParams();



    const safeUri = Array.isArray(uri) ? uri[0] : uri;


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
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
        alignSelf: 'stretch',
    },

});