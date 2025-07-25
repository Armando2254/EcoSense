import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Modal } from 'react-native';

export default function PerfilScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Contenido principal con fondo verde */}
      <View style={styles.profileCard}>  {/* Este es el contenedor con fondo verde */}
        <Text style={styles.profileTitle}>Perfil</Text>
        
        <Image 
          source={require('../../assets/images/user-profile.png')} 
          style={styles.profileImage}
        />
        
        <Text style={styles.profileTitle}>Perfil</Text>
        
        <Text style={styles.userName}>Perez Lopez Luisa</Text>
        <Text style={styles.userEmail}>lusalopez@example.com</Text>
        
        <Pressable 
          style={styles.editButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.editButtonText}>¿Quieres editar tu perfil?</Text>
        </Pressable>
        
        <Text style={styles.adminText}>Habla con algun administrador</Text>
      </View>

      {/* Modal de edición (se mantiene igual) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nombre:</Text>
              <Text style={styles.inputValue}>Perez Lopez Luisa</Text>
            </View>
            
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',  // Centra verticalmente la tarjeta
  },
  profileCard: {
    backgroundColor: '#79EDAC',  // Fondo verde
    borderRadius: 15,           // Bordes redondeados
    padding: 25,               // Espaciado interno
    alignItems: 'center',
    elevation: 5,              // Sombra en Android
    shadowColor: '#000',       // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',            // Texto blanco para contrastar con el fondo verde
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 15,
    borderWidth: 3,            // Borde blanco para la imagen
    borderColor: 'black',      //color negro de las letras
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: 'black',            // Texto negro
  },
  userEmail: {
    fontSize: 16,
    color: 'black',            // Texto negro
    marginVertical: 10,
    opacity: 0.9,              // Ligera transparencia
  },
  editButton: {
    backgroundColor: 'white',   // Fondo blanco para el botón
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
  },
  editButtonText: {
    color: '#000000',          // Texto negro para contrastar con fondo blanco
    fontWeight: 'bold',
    fontSize: 16,
  },
  adminText: {
    marginTop: 15,
    color: 'black',            // Texto blanco
    fontStyle: 'italic',
    opacity: 0.8,
  },
  // ... (el resto de los estilos del modal se mantienen igual)
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  inputValue: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});