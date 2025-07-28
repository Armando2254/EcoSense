import { View, Text, ScrollView, ActivityIndicator, Modal, Pressable, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function DetalleContenedores() {
  const { contenedores } = useLocalSearchParams();
  const contenedorIds: string[] = contenedores ? JSON.parse(contenedores as string) : [];

  const [contenedoresData, setContenedoresData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState<{
    latitud: number;
    longitud: number;
    nombre: string;
  } | null>(null);

  useEffect(() => {
    const fetchContenedores = async () => {
      try {
        const data: any[] = [];

        for (const id of contenedorIds) {
          const response = await fetch(`http://192.168.1.68:7168/api/Contenedor/${id}`);
          const contenedor = await response.json();
          data.push(contenedor);
        }

        setContenedoresData(data);
      } catch (error) {
        console.error('Error al obtener los contenedores:', error);
      } finally {
        setLoading(false);
      }
    };

    if (contenedorIds.length > 0) {
      fetchContenedores();
    } else {
      setLoading(false);
    }
  }, [contenedorIds]);

  const abrirMapa = (lat: number, lng: number, nombre: string) => {
    setUbicacionSeleccionada({ latitud: lat, longitud: lng, nombre });
    setModalVisible(true);
  };

  return (
    <View className="flex-1 pt-16 items-center bg-white px-4">
      <Text className="text-4xl font-bold mb-4">Contenedores</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : contenedoresData.length === 0 ? (
        <Text className="text-gray-500">No se recibieron contenedores.</Text>
      ) : (
        <ScrollView className="w-full">
          {contenedoresData.map((contenedor, index) => (
            <View key={index} className="w-full bg-[#c2e2d0] rounded-lg gap-3 p-4 mb-4 shadow-sm">
              <Text className="font-bold text-base">{contenedor.nombre}</Text>
              <Text>Ubicación: {contenedor.ubicacion.nombre}</Text>
              <View className="flex-row justify-around mb-2">
                <Text>Latitud: {contenedor.ubicacion.latitud}</Text>
                <Text>Longitud: {contenedor.ubicacion.longitud}</Text>
              </View>

              <Pressable
                onPress={() =>
                  abrirMapa(
                    contenedor.ubicacion.latitud,
                    contenedor.ubicacion.longitud,
                    contenedor.nombre
                  )
                }
                className="bg-[#F2F2F2] py-2 px-4 rounded-lg"
              >
                <Text className=" text-center font-semibold">Ver en Mapa</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Modal flotante */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white w-11/12 h-[60%] rounded-2xl p-4 items-center relative">
            {/* Botón de cerrar */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="absolute top-2 right-2 z-10 p-2"
            >
              <Text className="text-red-500 text-xl font-bold">✕</Text>
            </TouchableOpacity>

            {/* Título */}
            <Text className="text-lg font-bold mb-4 text-center">
              Mapa de {ubicacionSeleccionada?.nombre}
            </Text>

            {/* Mapa */}
            <View className="w-[300px] h-[300px] rounded-lg overflow-hidden">
              {ubicacionSeleccionada && (
                <MapView
                  style={{ flex: 1 }}
                  initialRegion={{
                    latitude: ubicacionSeleccionada.latitud,
                    longitude: ubicacionSeleccionada.longitud,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: ubicacionSeleccionada.latitud,
                      longitude: ubicacionSeleccionada.longitud,
                    }}
                    title={ubicacionSeleccionada.nombre}
                  />
                </MapView>
              )}
            </View>

            {/* Texto adicional o botones si quieres */}
            
          </View>
        </View>
      </Modal>
    </View>
  );
}
