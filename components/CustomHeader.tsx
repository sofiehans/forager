// components/CustomHeader.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function CustomHeader() {
    return (
        <View style={styles.header}>
            <Image
                source={require('../assets/images/foragerIcon.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.bottomLine} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: '#1D3836',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 130,
    },
    logo: {
        width: 80,
        height: 80,
    },
    bottomLine: {
        height: 2,
        width: '60%',
        backgroundColor: '#000000',
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 1,
    },
});
