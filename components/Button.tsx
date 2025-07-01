import { StyleSheet, View, Pressable, Text, ImageSourcePropType, Image, ViewStyle } from 'react-native';

type Props = {
    onPress?: () => void;
    imageSource?: ImageSourcePropType;
    style?: ViewStyle;
};

export default function Button({ onPress, imageSource, style }: Props) {
    return (
        <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: '#FFF8F0', borderRadius: 18 }, style]}>
            <Pressable
                style={[styles.button,]}
                onPress={onPress}>
                {imageSource && (
                    <Image source={imageSource} style={styles.image} />
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 201,
        height: 176,
        marginVertical: 12,
    },
    button: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
