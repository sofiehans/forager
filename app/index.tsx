import Button from '@/components/Button';
import { Text, View, StyleSheet, Alert } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraComponent from '@/components/CameraComponent';
import { SourceTextModule } from 'vm';
import { Link, useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

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

  //REMOVE AFTER DEVOLOPMENT
  const resetLaunchFlag = async () => {
    await AsyncStorage.removeItem('hasLaunched');
    alert('Launch flag reset — restart app to test!');
  };

  const identify = () => {
    router.push('/CameraScreen');
  }

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
        <Button imageSource={require('../assets/images/identify.png')} onPress={identify} style={{ marginBottom: 30 }} />
        <Button imageSource={require('../assets/images/history.png')} onPress={history} />

        {/* REMOVE AFTER DEVOLOPMENT */}
        <View style={{ marginTop: 20 }}>
          <Button onPress={resetLaunchFlag} style={{ width: 60, height: 60, backgroundColor: '#FF0000' }} />
        </View>
        {/* ################# */}

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

