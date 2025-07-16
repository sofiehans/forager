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
