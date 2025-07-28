import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/userContext';
import { useRouter } from 'expo-router';






type Ruta = {
  id: string;
  idRecolector: string | null;
  nombreRecolector: string | null;
  idAdministrador: string | null;
  nombreAdministrador: string | null;
  contenedores: string[];
  fechaAsignacion: string; // o Date si ya lo parseas como objeto de fecha
};

export default function Tab() {
  const { idRecolector } = useUser();
  const router = useRouter();



  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAPIdata = async () => {

      
      try {
        const baseURL = "http://192.168.1.68:7168/api";
        const ApiUrl = "/Rutas/RecolectorConNombre/"+idRecolector;
        const result = await axios.get(baseURL + ApiUrl);
        
        // Asegúrate de que la API devuelve un array
        if (Array.isArray(result.data)) {
          setRutas(result.data);
        } else {
          // Si la API devuelve un solo objeto, lo convertimos a array
          setRutas([result.data]);
        }
        
        console.warn("Datos recibidos:", result.data);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      } finally {
        setLoading(false);
      }
    };

    getAPIdata();
  }, [idRecolector]);





    if (loading) {
    return <ActivityIndicator size="large" color="#00f" />;
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={rutas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-[#c2e2d0] p-4 rounded-2xl mb-3">
            <Text className="text-lg font-bold">Ruta</Text>


            <View className='flex-row justify-around'>
              <View className=''>
                <Text>Creador: {item.nombreAdministrador}</Text>
                <Text>Asignado: {item.nombreRecolector}</Text>
                <Text>Asignado: {item.fechaAsignacion}</Text>
              </View>

              <View className=''>
                <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '../detalleContenedores',
            params: {
              contenedores: JSON.stringify(item.contenedores),
            },
          })
        }
        className="mt-3 bg-[#F2F2F2] py-2 px-4 rounded-lg self-start"
      >
        <Text className=" font-medium">Info</Text>
      </TouchableOpacity>
              </View>
            </View>




            


            
           


           
          </View>
        )}
      />
    </View>
  );
}

