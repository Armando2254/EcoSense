// ModalContenedor.tsx
import React, { useState } from "react";
import { Modal, View, Text, Pressable, Image } from "react-native";

type ModalProps = {
    
  visible: boolean;
  onClose: () => void;
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
    fechaUltimaLectura: Date,
    idRecolector: string
};

const porcen = (porcen: number): 'Vacio.png' | '20.png' | '40.png' | '60.png' | '80.png' | '100.png' => {
  if (porcen <= 19) return 'Vacio.png';
  if (porcen <= 39) return '20.png';
  if (porcen <= 49) return '40.png';
  if (porcen <= 79) return '60.png';
  if (porcen <= 89) return '80.png';
  return '100.png';
};
const imagenesPorcentaje: Record<
  'Vacio.png' | '20.png' | '40.png' | '60.png' | '80.png' | '100.png',
  any
> = {
  'Vacio.png': require('../assets/images/Vacio.png'),
  '20.png': require('../assets/images/20.png'),
  '40.png': require('../assets/images/40.png'),
  '60.png': require('../assets/images/60.png'),
  '80.png': require('../assets/images/80.png'),
  '100.png': require('../assets/images/100.png'),
};

export const ContenedorModal = ({ visible, onClose, id, nombre, status, porcentajeActual, ubicacion, idRecolector}: ModalProps) => {

  const asignarRecolector = async (idContenedor: string, iecolector: string) => {
  const fechaVaciado = new Date().toISOString(); // Fecha actual en formato ISO

  try {
    const response = await fetch('http://192.168.1.68:7168/api/Registro/asignar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        IDContenedor: idContenedor,
        IDRecolector: iecolector,
        fechaVaciado: fechaVaciado,
        tiempoLleno: 0 // este lo calcularás en el backend
      }),
    });

    console.log(idContenedor, iecolector, fechaVaciado);

    if (response.ok) {
      console.log('Asignación exitosa');
    } else {
      console.error('Error en asignación:', response.status);
    }
  } catch (error) {
    console.error('Error de red en asignarRecolector:', error);
  }
};









  const actualizarPorcentaje = async (id: string) => {
  try {
    const response = await fetch(`http://192.168.1.68:7168/api/Contenedor/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        porcentajeActual: 0,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Actualización exitosa:', data.message);
    } else {
      console.error('Error al actualizar:', response.status);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};
  






const actualizarEstado = async (id: string) => {
  try {
    const response = await fetch(`http://192.168.1.68:7168/api/Contenedor/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: "en uso",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Actualización exitosa:', data.message);
    } else {
      console.error('Error al actualizar:', response.status);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};
  








  
  const vaciarContenedor = async () => {
  await actualizarPorcentaje(id);
  await asignarRecolector(id, idRecolector);
  await actualizarEstado(id);
};

  
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="bg-white p-2 pt-4 rounded-xl w-4/5">

        <View className="flex flex-row">
    {/* Fila para los dos primeros hijos */}
    <View className="flex-[4] ">
        <Image source={imagenesPorcentaje[porcen(porcentajeActual)]} className="w-32 h-36 scale-100"/>

    </View>

    <View className="flex-[6]">
      <Text className="text-m font-bold mb-2">{nombre}</Text>
      <Text className="text-base">Porcentaje: {Math.floor(porcentajeActual)}% </Text>
      <Text className="text-base">Ubicacion:  {ubicacion.nombre}</Text>
      <Text className="text-base">Latitud: {ubicacion.latitud} </Text>
      <Text className="text-base">Longitud: {ubicacion.longitud}</Text>
    </View>
  </View>


<View className="w-full    flex-row justify-around pb-4">
          <Pressable onPress={onClose} className="w-32 mt-4 bg-blue-500 px-4 py-2 rounded-full">
            <Text className="text-white text-center">Cerrar</Text>
          </Pressable>

          <Pressable
  onPress={vaciarContenedor}
  className="w-32 mt-4 bg-red-500 px-4 py-2 rounded-full"
>
  <Text className="text-white text-center">Vaciar</Text>
</Pressable>
  </View>




          
          





        </View>
      </View>
    </Modal>
  );
};
