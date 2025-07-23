import { View, Text, StyleSheet } from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';



export default function Tab() {

  type Ubicacion = {
   nombre: string;
   longitud: number;
   latitud: number;
};

  const [datos, setDatos] = useState<Ubicacion | null>(null);

  useEffect(()=>{
    const getAPIdata = async () => {
    try {
      const baseURL = "http://192.168.1.68:7168/api";
      const ApiUrl = "/Contenedor/687b34b05069326da2355afb/ubicacion"
      const result = await axios.get(baseURL+ApiUrl);
      console.warn("Datos recibidos:", result.data);
      setDatos(result.data);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }

    
  };

  getAPIdata();
  },[]) 


  return (
  <View style={styles.container}>
    <Text>Tab [Home|Settings]</Text>

    <Text>Datos: {JSON.stringify(datos)}</Text>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
