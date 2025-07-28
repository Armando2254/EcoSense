import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { useUser } from '../contexts/userContext';



export default function Login() {
  const router = useRouter();
  const { setIdRecolector } = useUser();

const obtenerRecolector = async (email: string) => {
                  try {
                    const response = await fetch(`http://192.168.1.68:7168/api/Recolector/por-email?email=${email}`);
                    const data = await response.json();
                  
                    if (data && data.id) {
                      const id = data.id; 
                      setIdRecolector(id);
                      // Aquí ya tienes el ID del recolector
                      router.push({
                        pathname: '/(tab)',
                        params: { id: data.id }
                      });
                    } else {
                      console.warn("No se encontró el recolector.");
                    }
                  } catch (error) {
                    console.error("Error al obtener recolector:", error);
                  }
                };

  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  
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
            <TextInput value={email} onChangeText={setEmail} id='email' className='w-80 bg-[#ffffff] rounded-md' placeholder="Email" placeholderTextColor="#A0A0A0" />
            
            <Text>Password</Text>
            <TextInput value={contrasena} onChangeText={setContrasena} id='contra' className='w-80 bg-[#ffffff] rounded-md' placeholder="Password" placeholderTextColor="#A0A0A0" />

            <CustomButton onPress={async () => {
              const response = await fetch('http://192.168.1.68:7168/api/Recolector/login', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                email: email,
                contrasena: contrasena 
              }),
              });

              const data = await response.json();
              
              if (data === true) {

                obtenerRecolector(email);


                
              } else {
               Alert.alert('Faltan cosas');
              }

            }}
            color="primary" className="w-[272px]">Login</CustomButton>
    
            <TouchableOpacity onPress={() => router.push('/forgot')}>
              <Text className='underline'>Forgot password?</Text>
            </TouchableOpacity>
            
          </View>
        </SafeAreaView>
  );
}
