import CameraComponent from '@/components/CameraComponent';
import { View } from 'react-native';

export default function CameraScreen() {
    return (
        <View style={{ flex: 1 }}>
            <CameraComponent />
        </View>
    );
}
