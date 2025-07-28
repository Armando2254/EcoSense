import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Modal, ActivityIndicator } from 'react-native';
import { useUser } from '../../contexts/userContext';

export default function PerfilScreen() {
  const { idRecolector } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [recolector, setRecolector] = useState<Recolector | null>(null);
  const [loading, setLoading] = useState(true);
  // types/Recolector.ts
  type Recolector = {
  id: string;
  nombrePila: string;
  primerApell: string;
  segundoApell: string;
  edad: number;
  email: string;
  contrasena: string;
  status: boolean;
}




  useEffect(() => {
    const fetchRecolector = async () => {
      try {
        const res = await fetch(`http://192.168.1.68:7168/api/recolector/${idRecolector}`);
        if (!res.ok) throw new Error('Error al obtener el recolector');
        const data: Recolector = await res.json();
        setRecolector(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecolector();
  }, [idRecolector]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!recolector) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-600 font-bold text-lg">No se pudo cargar el perfil</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-5 justify-center">
      <View className="bg-green-300 rounded-2xl p-6 items-center shadow-md">
        <Text className="text-2xl font-bold text-black mb-2">Perfil</Text>

        <Image
          source={require('../../assets/images/user-profile.png')}
          className="w-28 h-28 rounded-full border-2 border-black my-4"
        />

        <Text className="text-lg font-semibold text-black">
          {recolector.nombrePila} {recolector.primerApell} {recolector.segundoApell}
        </Text>
        <Text className="text-base text-black opacity-90 mt-1">{recolector.email}</Text>

        <Pressable
          className="bg-white mt-5 py-3 px-6 rounded-full"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-black font-bold text-base">¿Quieres editar tu perfil?</Text>
        </Pressable>

        <Text className="mt-4 italic text-black opacity-80">Habla con algún administrador</Text>
      </View>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-5 rounded-xl w-4/5">
            <Text className="text-xl font-bold text-center mb-5">Editar Perfil</Text>

            <View className="mb-4">
              <Text className="font-bold text-gray-700 mb-1">Nombre:</Text>
              <Text className="bg-gray-100 p-3 rounded-md">
                {recolector.nombrePila} {recolector.primerApell} {recolector.segundoApell}
              </Text>
            </View>

            <View className="mb-4">
              <Text className="font-bold text-gray-700 mb-1">Email:</Text>
              <Text className="bg-gray-100 p-3 rounded-md">{recolector.email}</Text>
            </View>

            <View className="flex-row justify-between mt-6">
              <Pressable
                className="bg-green-600 py-2 px-4 rounded-md"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white font-bold">Guardar</Text>
              </Pressable>
              <Pressable
                className="bg-red-600 py-2 px-4 rounded-md"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white font-bold">Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
