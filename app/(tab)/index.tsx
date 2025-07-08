import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  Pressable,
  Text,
  Modal,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [infoPin, setInfoPin] = useState('');

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
      onPanResponderGrant: () => {
  pan.extractOffset(); // ✅ más limpio y seguro
},

    })
  ).current;

  // Aquí defines la posición del pin respecto a la imagen
  const pines = [
    { id: 'pin1', top: 200, left: 150, texto: 'Pin 1' },
    { id: 'pin2', top: 500, left: 300, texto: 'Pin 2' },
  ];

  return (
    <View className="flex-1 bg-white">
      <Animated.View
        style={[
          {
            width: 1000, // Tamaño real de la imagen
            height: 1000,
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Imagen base */}
        <Image
          source={{ uri: 'https://via.placeholder.com/1000' }}
          style={{ width: 1000, height: 1000, position: 'absolute' }}
        />

        {/* Pines */}
        {pines.map((pin) => (
          <Pressable
            key={pin.id}
            onPress={() => {
              setInfoPin(pin.texto);
              setModalVisible(true);
            }}
            style={{
              position: 'absolute',
              top: pin.top,
              left: pin.left,
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>📍</Text>
          </Pressable>
        ))}
      </Animated.View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white p-5 rounded-xl">
            <Text className="text-lg mb-3">{infoPin}</Text>
            <Pressable
              className="bg-blue-500 px-4 py-2 rounded"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white">Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
