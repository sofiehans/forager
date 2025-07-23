import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomHeader from "@/components/CustomHeader";
import { MushroomDataProvider } from "../context/MushroomDataContext";


export default function RootLayout() {
  return (
    <MushroomDataProvider>
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
              headerTintColor: '#F0E3CE',
            }}
          />
          <Stack.Screen
            name="IdentifyPictureScreen"
            options={{
              headerTitle: '',
              headerStyle: {
                backgroundColor: '#1D3836',
              },
              headerTintColor: '#F0E3CE',
            }}

          />
          <Stack.Screen
            name="InformationScreen"
            options={{
              header: () => <CustomHeader />,
            }}
          />
        </Stack>
      </>
    </MushroomDataProvider>
  );
}
