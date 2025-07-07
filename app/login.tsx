import React from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';



export default function Login() {
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
            <View className='flex-row'>
              <Text className='font-work-medium text-4xl'>Log In</Text>
              <Image
              source={require('../assets/images/ABAJO1.png')}
              className="w-10 h-10 scale-100"
              resizeMode="cover"
              /></View>
            
          
            <CustomButton
              onPress={() => router.push('/login')}
              color="primary"
              className="w-[272px]"
            >
              Login
            </CustomButton>
    
            
          </View>
        </SafeAreaView>
  );
}
