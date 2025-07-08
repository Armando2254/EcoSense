import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';



export default function Login() {
  return (
    <SafeAreaView className="flex-1 items-start justify-center bg-[#c2e2d0] ">
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
          <View className="items-start gap-5 mt-10 p-5">
            <View className='flex-row'>
              <Text className='font-work-black text-4xl text-[#343538]'>Log In</Text>
              <Image
              source={require('../assets/images/Login.png')}
              className="w-10 h-10 scale-90"
              resizeMode="cover"
              /></View>
              <Text>Email</Text>
            <TextInput className='w-80 bg-[#374B40] rounded-md'>hola me llamo carlos </TextInput>
            <Text>Password</Text>
            <TextInput className='w-80 bg-[#374B40] rounded-md'>hola me llamo carlos</TextInput>

            <CustomButton
              onPress={() => router.push('/(tab)')}
              color="primary"
              className="w-[272px]"
            >
              Login
            </CustomButton>
    
            <TouchableOpacity onPress={() => router.push('/forgot')}>
              <Text className='underline'>Forgot password?</Text>
            </TouchableOpacity>
            
          </View>
        </SafeAreaView>
  );
}
