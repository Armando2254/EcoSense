import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

type Ubicacion = {
  id: string; // Añadir un identificador único para cada ruta
  nombre: string;
  longitud: number;
  latitud: number;
  // Puedes añadir más propiedades según lo que devuelva tu API
  distancia?: number;
  tiempoEstimado?: string;
};

export default function Tab() {
  const [rutas, setRutas] = useState<Ubicacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAPIdata = async () => {
      try {
        const baseURL = "http://192.168.1.68:7168/api";
        const ApiUrl = "/Contenedor/687b34b05069326da2355afb/ubicacion";
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
  }, []);

  const renderItem = ({ item }: { item: Ubicacion }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.nombre}</Text>
      <Text>Coordenadas: {item.latitud}, {item.longitud}</Text>
      {/* Mostrar información adicional si existe */}
      {item.distancia && <Text>Distancia: {item.distancia} km</Text>}
      {item.tiempoEstimado && <Text>Tiempo estimado: {item.tiempoEstimado}</Text>}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando rutas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Rutas</Text>
      
      {rutas.length > 0 ? (
        <FlatList
          data={rutas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text>No hay rutas disponibles</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});