import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import axios from 'axios';
import { ContenedorModal } from "../../components/ContenedorModal";
import { useLocalSearchParams } from 'expo-router';




export default function Index() {
  const { id } = useLocalSearchParams();

const idFinal = Array.isArray(id) ? id[0] : id;
    const [modalVisible, setModalVisible] = useState(false);
  const [contenedorSeleccionado, setContenedorSeleccionado] = useState<{ id: string;
  nombre: string;
  status: string;
  distancia: number;
  porcentajeActual: number;
  fechaUltimaLectura: Date;
  ubicacionNombre: string;
  ubicacionLatitud: number;
  ubicacionLongitud: number;
  idRecolector: string; } | null>(null);
    const abrirModal = (id: string,
  nombre: string,
  status: string,
  distancia: number,
  porcentajeActual: number,
  fechaUltimaLectura: Date,
  ubicacionNombre: string,
  ubicacionLatitud: number,
  ubicacionLongitud: number,
idRecolector: string) => {
    setContenedorSeleccionado({id,
  nombre,
  status,
  distancia,
  porcentajeActual,
  fechaUltimaLectura,
  ubicacionNombre,
  ubicacionLatitud,
  ubicacionLongitud,
idRecolector,});
    setModalVisible(true);
  };


  type Contenedor = {
    id: string,
    nombre: string,
    ubicacion: {
        longitud: number,
        latitud: number,
        nombre: string,
        }
    status: string,
    distancia: number,
    porcentajeActual: number,
    fechaUltimaLectura: Date
   
};

  const [datos, setDatos] = useState<Contenedor[]>([]);

  useEffect(()=>{
    const getAPIdata = async () => {
    try {
      const baseURL = "http://192.168.1.68:7168/api";
      const ApiUrl = "/Contenedor"
      const result = await axios.get(baseURL+ApiUrl);
      console.warn("Datos recibidos:", result.data);

      setDatos(result.data);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }

    
  };

  getAPIdata();
  },[]) 





  const [origin, setOrigin] = React.useState({
    latitude: 32.4578,
    longitude:-116.8272,
  })

 
  const [destination , setDestination] = React.useState({
    latitude: 32.4578,
    longitude:-116.8272,
  })
  


  return(
    <View className='flex-1 items-center justify-center'>
      <MapView style={styles.map} region={{
        
        latitude: origin.latitude,
      longitude: origin.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.01
    
      }}
       customMapStyle={require('../../assets/mapaEstilo.json')}>
        {
        datos ?
        datos.map((contenedor) => (
            <Marker key={contenedor.id} coordinate={{latitude: contenedor.ubicacion.latitud, longitude: contenedor.ubicacion.longitud}} onPress={() => abrirModal(
              
              
              contenedor.id, contenedor.nombre, contenedor.status, contenedor.distancia, contenedor.porcentajeActual,  contenedor.fechaUltimaLectura, contenedor.ubicacion.nombre, contenedor.ubicacion.latitud,contenedor.ubicacion.longitud, idFinal 


            )} pinColor={contenedor.status=="en uso" ? "#2ee16a" : "rojo"}></Marker>
         
        ))
        : null
      }
        
        

      
      
      </MapView>
{contenedorSeleccionado && (
  <ContenedorModal
    visible={modalVisible}
    onClose={() => setModalVisible(false)}
    id={contenedorSeleccionado.id}
    nombre={contenedorSeleccionado.nombre}
    status={contenedorSeleccionado.status}
    distancia={contenedorSeleccionado.distancia}
    porcentajeActual={contenedorSeleccionado.porcentajeActual}
    fechaUltimaLectura={contenedorSeleccionado.fechaUltimaLectura}
    ubicacion={{
      latitud: contenedorSeleccionado.ubicacionLatitud,
      longitud: contenedorSeleccionado.ubicacionLongitud,
      nombre: contenedorSeleccionado.ubicacionNombre
    }}
    idRecolector={idFinal}
  />
)}

    </View>
  );
}













const styles = StyleSheet.create({
  map: {
    width: '100%',  // igual a w-72
    height: '100%', // igual a h-72
  },
});


