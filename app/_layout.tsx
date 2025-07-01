import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import CustomHeader from "@/components/CustomHeader";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader />,
            title: "Back"
          }}
        />
        <Stack.Screen
          name="CameraScreen"
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#1D3836',
            },
            headerTintColor: '#FFF8F0',
          }}
        />
        <Stack.Screen
          name="IdentifyPicture"
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#1D3836',
            },
            headerTintColor: '#FFF8F0',
          }}

        />
      </Stack>
    </>
  );
}
