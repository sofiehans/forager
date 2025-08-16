import Button from '@/components/Button';
import { View, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();

    // Check if this is the first time being downloaded - show warning if yes
    useEffect(() => {
        const checkFirstLaunch = async () => {
            try {
                const hasLaunched = await AsyncStorage.getItem('hasLaunched');
                if (!hasLaunched) {
                    // First launch
                    Alert.alert('Forager should not be used to identify mushrooms for consumption - always be aware that mushrooms can be harmful if consumed. Forager is not liable for any injuries that occur.');
                    await AsyncStorage.setItem('hasLaunched', 'true');
                }
            } catch (e) {
                console.error('Error checking first launch', e);
            }
        };

        checkFirstLaunch();
    }, []);

    // User pressed Identify button
    const identify = () => {
        router.push('/CameraScreen');
    }

    // User pressed History button
    const history = () => {
        //TODO: Implement history viewing
        Alert.alert(
            'Not Available',
            'This feature has not been implmented yet! Come back later!'
        );
    }

    return (
        <View style={styles.container}>
            <View >
                {/*Use custom ButtonComponent*/}
                <Button imageSource={require('../assets/images/identify.png')} onPress={identify} style={{ marginBottom: 30 }} />
                <Button imageSource={require('../assets/images/history.png')} onPress={history} />
            </View>
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
});