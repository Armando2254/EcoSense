import React from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';




export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#c2e2d0]">
      {/* Fondo decorativo arriba y abajo */}
      <Image
        source={require('../assets/images/ARRIBA1.png')}
        className="absolute bottom-0 left-0 w-full"
        resizeMode="cover"
      />
      <Image
        source={require('../assets/images/ABAJO1.png')}
        className="absolute top-0 left-0 w-full"
        resizeMode="cover"
      />

      {/* Contenido central */}
      <View className="items-center gap-5 mt-10">
        <Image
          source={require('../assets/images/logo.png')}
          className="w-72 h-72 scale-150 -mt-14"
          resizeMode="contain"
        />

        <CustomButton
          onPress={() => router.push('/login')}
          color="primary"
          className="w-[272px]"
        >
          Login
        </CustomButton>

        <CustomButton
          onPress={() => router.push('/register')}
          color="primary"
          className="w-[272px]"
        >
          Register
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};
