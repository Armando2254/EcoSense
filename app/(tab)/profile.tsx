import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';

export default function PerfilScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-white">
      {/* Contenido del perfil */}
      <ScrollView style={styles.contenedor}>

        <View style={styles.contenedorPerfil}>
          <Image 
            source={require('../../assets/images/user-profile.png')} 
            style={styles.fotoPerfil}
          />
          
          <Text style={styles.titulo}>Profile</Text>
          
          <View style={styles.filaInfo}>
            <Text style={styles.etiqueta}>Nombre:</Text>
            <Text style={styles.valor}>Perez Lopez Luisa</Text>
          </View>
          
          <View style={styles.filaInfo}>
            <Text style={styles.etiqueta}>Email:</Text>
            <Text style={styles.valor}>luisa.lopez@example.com</Text>
          </View>
          
          <View style={styles.filaInfo}>
            <Text style={styles.etiqueta}>Edad:</Text>
            <Text style={styles.valor}>35</Text>
          </View>
          
          <Pressable 
            style={styles.botonEditar}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textoBoton}>¿Quieres editar tu perfil?</Text>
          </Pressable>
          
          <Text style={styles.textoAdmin}>
            Habla con algún administrador
          </Text>
        </View>
      </ScrollView>

      {/* Modal para edición */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white p-5 rounded-xl w-96">
            <Text className="text-lg font-bold mb-4">Editar Perfil</Text>
            
            {/* Aquí irían los campos editables */}
            <View style={styles.filaInfoModal}>
              <Text style={styles.etiquetaModal}>Nombre:</Text>
              <Text style={styles.valorModal}>Perez Lopez Luisa</Text>
            </View>
            
            <View className="flex-row mt-5 justify-between">
              <Pressable
                className="bg-green-500 px-4 py-2 rounded"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">Guardar</Text>
              </Pressable>

              <Pressable
                className="bg-red-500 px-4 py-2 rounded"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  hora: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
  },
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  contenedorPerfil: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  filaInfo: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  filaInfoModal: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  etiqueta: {
    fontWeight: 'bold',
    width: 80,
    color: '#555',
  },
  etiquetaModal: {
    fontWeight: 'bold',
    color: '#555',
    marginRight: 10,
  },
  valor: {
    flex: 1,
    color: '#333',
  },
  valorModal: {
    flex: 1,
    color: '#333',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 3,
  },
  botonEditar: {
    marginTop: 30,
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
  textoAdmin: {
    marginTop: 10,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});