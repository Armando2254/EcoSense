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
              <Text className='font-work-black text-4xl text-[#343538]'>Register</Text>
              </View>
            <Text>Full Name</Text>
            <TextInput className='w-80 bg-[#ffffff] rounded-md' placeholder="Full Name" placeholderTextColor="#A0A0A0" />
            <Text>Email</Text>
            <TextInput className='w-80 bg-[#ffffff] rounded-md' placeholder="Email" placeholderTextColor="#A0A0A0" />
            
            <Text>Password</Text>
            <TextInput className='w-80 bg-[#ffffff] rounded-md' placeholder="Password" placeholderTextColor="#A0A0A0" />

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
