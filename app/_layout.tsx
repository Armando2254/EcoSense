// app/_layout.tsx
import { Stack } from 'expo-router';
import { Slot } from 'expo-router';
import { UserProvider } from '../contexts/userContext';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import '../global.css';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    WorkSansMedium: require('../assets/fonts/Work-Sans-Medium.ttf'),
    WorkSansBlack: require('../assets/fonts/Work-Sans-Black.ttf'), // ajusta ruta si es necesario
  });

  if (!fontsLoaded) {
    return <Text>Cargando fuentes...</Text>; // o null o un splash screen
  }

  return (
    <UserProvider>
    <Stack 
      screenOptions={{
        headerShown: false,
      }}
    />
    </UserProvider>
  );
}
