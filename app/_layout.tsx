// app/_layout.tsx
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import '../global.css';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    WorkSansMedium: require('../assets/fonts/Work-Sans-Medium.ttf'), // ajusta ruta si es necesario
  });

  if (!fontsLoaded) {
    return <Text>Cargando fuentes...</Text>; // o null o un splash screen
  }

  return (
    <Stack 
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
